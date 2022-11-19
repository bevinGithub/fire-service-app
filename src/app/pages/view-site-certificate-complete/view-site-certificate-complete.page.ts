import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CompanyRepSignaturePage } from 'src/app/modals/company-rep-signature/company-rep-signature.page';
import { ServiceClientSignaturePage } from 'src/app/modals/service-client-signature/service-client-signature.page';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-view-site-certificate-complete',
  templateUrl: './view-site-certificate-complete.page.html',
  styleUrls: ['./view-site-certificate-complete.page.scss'],
})
export class ViewSiteCertificateCompletePage implements OnInit {
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

  panels: any;
  site: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    console.log(this.certficateID);
    this.http.get(this.url + 'get-service-certificate-history-app-new-history.php?id=' + this.certficateID).subscribe((data: any) => {
      console.log(data);
      this.cert = data?.certificate;
      this.tech = data?.technician;
      this.staff = data?.staff;
      this.panels = data?.panels;
      this.site = data?.site;
      this.service.id = this.cert?.id;
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
    this.http.get(this.url + 'get-service-certificate-history-app-new-history.php?id=' + this.certficateID).subscribe((data: any) => {
      console.log(data);
      this.cert = data?.certificate;
      this.tech = data?.technician;
      this.staff = data?.staff;
      this.panels = data?.panels;
      this.site = data?.site;
      this.service.id = this.cert?.id;
      this.service.service_certificate_number = this?.cert.service_certificate_number;
      this.service.technician_id = this?.cert.technician_id;
    });
  }

}
