import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

import { Camera, PictureSourceType, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import * as moment from 'moment';


@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {
  siteID: any;
  siteData: any;
  refDate: any;
  serviceReference: any;
  url = environment.url;
  staff: any;
  service: any = {};
  photo: any;
  minDate: any;
  total: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private camera: Camera,
    private actionSheetController: ActionSheetController
  ) {
    this.minDate = moment(new Date()).format('YYYY-MM-DD');
    console.log(this.minDate);
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.staff = user;
      this.service.staffID = this.staff.id;
      this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
        console.log(res);
        this.total = res?.total;
      });
    });

    this.siteID = this.activatedRoute.snapshot.paramMap.get('siteID');
    console.log(this.siteID);
    this.http.get(this.url + 'get-site.php?siteID=' + this.siteID).subscribe((siteResp: any) => {
      console.log(siteResp);
      this.siteData = siteResp;
      this.service.siteID = siteResp.site_id;
      this.service.client_id = siteResp.site_id;
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
    this.http.post(this.url + 'post-service-request.php', this.service).subscribe((data: any) => {
      console.log(data);
      if (data.status === 'success') {
        this.faultConfirmation('Service request has been submitted successfully!');
        this.router.navigate(['/staff-menu/alarms-services']);
      } else {
        this.faultConfirmation('Service request could not be submitted successfully!');
      }
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'MODE',
      buttons: [{
        text: 'Camera',
        role: 'destructive',
        icon: 'camera',
        cssClass: 'actionIcons',
        handler: () => {
          console.log('Take Picture');
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        cssClass: 'actionIcons',
        handler: () => {
          console.log('Share clicked');
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType,
      allowEdit: false,
      correctOrientation: true,
      targetWidth: 600,
      targetHeight: 600,
      saveToPhotoAlbum: false,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
      console.log( this.photo);
      this.service.controlPanelPhoto = this.photo;
    }, (err) => {
      console.log(err);
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
