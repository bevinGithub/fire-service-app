import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';


@Component({
  selector: 'app-view-client-certificates',
  templateUrl: './view-client-certificates.page.html',
  styleUrls: ['./view-client-certificates.page.scss'],
})
export class ViewClientCertificatesPage implements OnInit {

  cert: any;
  tech: any;
  staff: any;
  certficateID: any;
  service: any = {};
  hideClientBtn: boolean;
  hideRepBtn: boolean;
  url = environment.url;
  clientSignature: any;
  repSignature: any;
  dateTechSigned: any;
  dateClientSigned: any;
  site: any;
  networkStatus: any;
  database: SQLiteObject;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController,
    private sqlite: SQLite,
    private networkCheckerService: NetworkCheckerService
  ) {
    this.certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    console.log(this.certficateID);
    this.viewCompletedServiceCardDetails(this.certficateID);
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
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.sqlite.create({
        name: 'fireservices.db',
        location: 'default',
       }).then((db: SQLiteObject) => {
         this.database = db;
         this.getOfflineSC(this.certficateID);
       });
    }
  }

  viewCompletedServiceCardDetails(certficateID) {
    this.http.get(this.url + 'sp-get-service-certificate.php?id=' + certficateID).subscribe((data: any) => {
      console.log(data);
      this.cert = data?.certificate;
      this.tech = data?.technician;
      this.staff = data?.staff;
      this.site = data?.site;
      this.service.id = this.cert?.id;
      this.service.service_certificate_number = this?.cert.service_certificate_number;
      this.service.technician_id = this?.cert.technician_id;
    });
  }

  getOfflineSC(scID) {
    console.log(scID);
    const offData = [];
    // eslint-disable-next-line max-len
    const querySC = 'SELECT *,fire_sp_service_certificates.service_status AS cert_status  FROM fire_sp_service_certificates JOIN fire_sp_users ON fire_sp_service_certificates.client_id=fire_sp_users.user_id JOIN fire_sp_sites ON fire_sp_service_certificates.site_id = fire_sites.site_id  WHERE fire_sp_service_certificates.cert_id=?';
    this.database.executeSql(querySC,[scID]).then((rec: any) => {
      console.log('SC: ' + JSON.stringify(rec));
      console.log('Record Found: ' + rec.rows.length);
      if (rec.rows.length > 0) {
       this.cert = rec.rows.item(0);
       //#GET TECH DATA
       const query = 'SELECT * FROM fire_sp_users WHERE user_id=?';
       this.database.executeSql(query, [this.cert?.service_technician_id]).then((res2: any) => {
          if (res2.rows.length > 0) {
            this.tech = res2.rows.item(0);
          }
       });
       //GET CLIENT DATA
       const queryClient = 'SELECT * FROM fire_sp_users WHERE client_id=?';
       this.database.executeSql(queryClient, [this.cert?.client_id]).then((resClient: any) => {
          if (resClient.rows.length > 0) {
            this.staff = resClient.rows.item(0);
          }
       });
       //GET SITE DATA
       const querySite = 'SELECT * FROM fire_sp_sites WHERE site_id=?';
       this.database.executeSql(querySite, [this.cert?.site_id]).then((resSite: any) => {
          if (resSite.rows.length > 0) {
            this.site = resSite.rows.item(0);
          }
       });

      }
    });
  }

}
