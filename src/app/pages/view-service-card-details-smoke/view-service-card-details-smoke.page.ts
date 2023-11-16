import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-view-service-card-details-smoke',
  templateUrl: './view-service-card-details-smoke.page.html',
  styleUrls: ['./view-service-card-details-smoke.page.scss'],
})
export class ViewServiceCardDetailsSmokePage implements OnInit {
  public cert: any;
  public tech: any;
  public staff: any;
  certficateID: any;
  service: any = {};
  hideClientBtn: boolean;
  hideRepBtn: boolean;
  url = environment.url;
  clientSignature: any;
  repSignature: any;
  dateTechSigned: any;
  dateClientSigned: any;
  panels: any;
  site: any;
  networkStatus: any;
  isConnected: any;
  database: SQLiteObject;

  moduleID: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
  ) {
    this.certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    console.log(this.certficateID);
    this.getServiceCardData(this.certficateID);
    this.hideClientBtn  = false;
    this.hideRepBtn = false;
    this.dateClientSigned = moment(new Date()).format('YYYY-MM-DD');
    this.dateTechSigned = moment(new Date()).format('YYYY-MM-DD');
    this.service.date_client_signed = this.dateClientSigned;
    this.service.date_tech_signed = this.dateTechSigned;
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    console.log(this.certficateID);
  }

  getServiceCardData(certficateID) {
    this.http.get(this.url + 'sp-get-service-certificate-sc.php?id=' + certficateID).subscribe((data: any) => {
      console.log(data);
      this.cert = data?.certificate;
      this.tech = data?.technician;
      this.staff = data?.staff;
      this.service.id = this.cert?.id;
      this.service.service_certificate_number = this?.cert.service_certificate_number;
      this.service.service_request_id = this?.cert.service_request_id;
      this.service.technician_id = this?.cert.service_technician_id;
      this.panels = data?.panels;
      this.site = data?.site;
      this.moduleID = this.cert?.module_id;
    });
  }

  ionViewDidEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
      this.sqlite.create({
        name: 'fireservices.db',
        location: 'default',
       }).then((db: SQLiteObject) => {
         this.database = db;
         this.getOfflineSC(this.certficateID);
       });
    }
  }

  getOfflineSC(scID) {
    const offData = [];
    // eslint-disable-next-line max-len
    const querySC = 'SELECT * FROM fire_sp_service_certificates JOIN fire_sp_sites ON fire_sp_service_certificates.site_id = fire_sp_sites.site_id  WHERE fire_sp_service_certificates.cert_id=?';
    this.database.executeSql(querySC,[scID]).then((rec: any) => {
      if (rec.rows.length > 0) {
       this.cert = rec.rows.item(0);
       console.log(this.cert);
       //#GET TECH DATA
       const query = 'SELECT * FROM fire_sp_users WHERE user_id=?';
       this.database.executeSql(query, [this.cert?.service_technician_id]).then((res2: any) => {
          if (res2.rows.length > 0) {
            this.tech = res2.rows.item(0);
          }
       });

      }
    });
  }

async systemNotification(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

}
