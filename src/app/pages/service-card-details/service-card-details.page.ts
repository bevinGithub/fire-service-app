import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CompanyRepSignaturePage } from 'src/app/modals/company-rep-signature/company-rep-signature.page';
import { ServiceClientSignaturePage } from 'src/app/modals/service-client-signature/service-client-signature.page';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-service-card-details',
  templateUrl: './service-card-details.page.html',
  styleUrls: ['./service-card-details.page.scss'],
})
export class ServiceCardDetailsPage implements OnInit {
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
    this.http.get(this.url + 'get-service-certificate.php?id=' + this.certficateID).subscribe((data: any) => {
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
    });
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
    this.http.get(this.url + 'get-service-certificate.php?id=' + this.certficateID).subscribe((data: any) => {
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
    });

    // this.sqlite.create({
    //   name: 'fireservices.db',
    //   location: 'default',
    //  }).then((db: SQLiteObject) => {
    //    this.database = db;
    //  });
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
    console.log(scID);
    const offData = [];
    // eslint-disable-next-line max-len
    const querySC = 'SELECT * FROM fire_service_certificates JOIN fire_sites ON fire_service_certificates.site_id = fire_sites.site_id  WHERE fire_service_certificates.cert_id=?';
    this.database.executeSql(querySC,[scID]).then((rec: any) => {
      console.log('SC: ' + JSON.stringify(rec));
      console.log('Record Found: ' + rec.rows.length);
      if (rec.rows.length > 0) {
       this.cert = rec.rows.item(0);
       console.log(this.cert);
       //#GET TECH DATA
       const query = 'SELECT * FROM fire_users WHERE user_id=?';
       this.database.executeSql(query, [this.cert?.service_technician_id]).then((res2: any) => {
          console.log('TECH DATA: ' + JSON.stringify(res2));
          if (res2.rows.length > 0) {
            this.tech = res2.rows.item(0);
          }
       });

      }
    });
  }

  async clientSignOff() {
        const modal = await this.modalController.create({
        component: ServiceClientSignaturePage,
        componentProps: {
          contractNumber: this.cert.service_contract_number,
          certificateNumber: this.cert.service_certificate_number,
          responsiblePerson: this.cert.responsible_person,
        }
      });
      await modal.present();

      modal.onDidDismiss().then((res: any) => {
        console.log(res);
        this.service.client_signature = res.data.clientSignature;
        this.clientSignature = res.data.clientSignature;
        this.service.date_signed_off_client = moment().format('YYYY-MM-DD HH:mm:ss');
        this.hideClientBtn  = true;
      });
  }

  async techSignOff() {
    const modal = await this.modalController.create({
      component: CompanyRepSignaturePage,
      componentProps: {
        contractNumber: this.cert.service_contract_number,
        certificateNumber: this.cert.service_certificate_number,
        responsiblePerson: this.tech.firstname + ' ' + this.tech.surname ,
      }
    });
    await modal.present();

    modal.onDidDismiss().then((res: any) => {
      console.log(res);
      this.service.company_rep_signature = res.data.companyRepSignature;
      this.repSignature = res.data.companyRepSignature;
      this.service.date_signed_off = moment().format('YYYY-MM-DD HH:mm:ss');
      this.hideRepBtn = true;
    });
  }

  processServiceCard() {
    this.http.post(this.url + 'process-service-certificate-app.php', this.service).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.systemNotification('Service certificate has been successfully processed!');
        this.router.navigate(['/technician-menu/technician-service-cards']);
      } else {
        this.systemNotification('Service certificte failed to be processed!');
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
