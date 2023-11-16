import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';

@Component({
  selector: 'app-accept-service-card-details',
  templateUrl: './accept-service-card-details.page.html',
  styleUrls: ['./accept-service-card-details.page.scss'],
})
export class AcceptServiceCardDetailsPage implements OnInit {
  serviceID: any;
  serviceCard: any;
  client: any;
  site: any;
  minDate: any;
  certificate: any = {};
  url = environment.url;
  rejectOption: boolean;
  moduleID: any;

  networkStatus: any;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private networkCheckerService: NetworkCheckerService
  ) {
    this.rejectOption = false;
    this.minDate = moment(new Date()).format('YYYY-MM-DD');
    console.log(this.minDate);
    this.serviceID = this.activatedRoute.snapshot.paramMap.get('serviceID');
    console.log(this.serviceID);
    this.http.get(this.url + 'sp-get-accept-service-details.php?serviceID=' + this.serviceID).subscribe((data: any) => {
      console.log(data);
      this.serviceCard = data?.service;
      this.client = data?.client;
      this.site = data?.site;
      this.certificate.id = this.serviceCard.id;
      this.certificate.arrivalTime = this.serviceCard.final_service_date + ' ' + this.serviceCard.service_time;
      this.moduleID = this.serviceCard.module_id;
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
  }

  ionViewDidEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
  }

  acceptServiceJob() {
    this.storage.get('currentUser').then((user: any) => {
      const postData = {
        techID: user.id,
        serviceID: this.certificate.id,
        estimatedArrivalTime: this.certificate.arrivalTime,
        certificateResponse: this.certificate.certificateResponse,
        rejectionReason: this.certificate.rejectionReason,
      };
      console.log(postData);
      this.http.post(this.url + 'sp-update-service-card-acceptance-2.php', postData).subscribe((data: any) => {
        console.log(data);
        if (data?.status === 'success') {
          this.systemNotification('Service certificate was accepted successfully!');
          this.router.navigate(['/technician-menu/technician-service-cards/' + this.moduleID]);
        } else {
          this.systemNotification('Service certificate could not be accepted successfully!');
        }
      });
    });
  }

  async systemNotification(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

  showReasonText(ev) {
    const selected = ev.detail.value;
    console.log(selected);
    if (selected === 'Rejected') {
      this.rejectOption = true;
    } else {
      this.rejectOption = false;
    }
  }

}
