import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';

@Component({
  selector: 'app-service-notification',
  templateUrl: './service-notification.page.html',
  styleUrls: ['./service-notification.page.scss'],
})
export class ServiceNotificationPage implements OnInit {
  siteID: any;
  serviceData: any;
  refDate: any;
  serviceReference: any;
  url = environment.url;
  staff: any;
  service: any = {};
  photo: any;
  minDate: any;
  serviceID: any;
  total: any;

constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
  ) {
    this.minDate = moment(new Date()).format('YYYY-MM-DD');
    console.log(this.minDate);

    this.storage.get('currentUser').then((user: any) => {
      console.log(user?.id);
      this.service.staff_id = user?.id;
    });

    this.serviceID = this.activatedRoute.snapshot.paramMap.get('serviceID');
    console.log(this.serviceID);
    this.http.get(this.url + 'get-service-notification-detail.php?serviceID=' + this.serviceID).subscribe((resp: any) => {
      console.log(resp);
      this.serviceData = resp.service;
      this.service.site_id = this.serviceData.site_id;
      this.service.client_id = this.serviceData.client_id;
      this.service.serviceDetails = this.serviceData.service_details;
      this.total = resp.total;
    });

    this.http.get(this.url + 'get-service-reference.php').subscribe((serviceRef: any) => {
      console.log(serviceRef);
      this.serviceReference = serviceRef.service_reference;
      this.refDate = serviceRef.refDate;
      this.service.serviceReference = this.serviceReference;
      this.service.referenceDate = this.refDate;
    });
  }

  ngOnInit() {
  }

  submitServiceRequest() {
    console.log(this.service);
    this.http.post(this.url + 'post-service-request-2.php', this.service).subscribe((data: any) => {
      console.log(data);
      if (data.status === 'success') {
        this.faultConfirmation('Service request has been submitted successfully!');
        this.router.navigate(['/staff-menu/staff-dashboard']);
      } else {
        this.faultConfirmation('Service request could not be submitted successfully!');
      }
    });
  }

  async faultConfirmation(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
