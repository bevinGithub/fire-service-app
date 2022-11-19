import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Camera, PictureSourceType, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-client-fault-report',
  templateUrl: './client-fault-report.page.html',
  styleUrls: ['./client-fault-report.page.scss'],
})
export class ClientFaultReportPage implements OnInit {
  siteID: any;
  siteData: any;
  refDate: any;
  faultReference: any;
  url = environment.url;
  staff: any;
  fault: any = {};
  photo: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private camera: Camera,
    private actionSheetController: ActionSheetController
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.fault.clientID = user.id;
      console.log(this.siteID);
      this.http.get(this.url + 'get-client-sites-client.php?clientID=' + user.id).subscribe((siteResp: any) => {
        console.log(siteResp);
        this.siteData = siteResp;
      });
    });


    this.http.get(this.url + 'get-booking-reference.php').subscribe((faultRef: any) => {
      console.log(faultRef);
      this.faultReference = faultRef.fault_reference;
      this.refDate = faultRef.refDate;
      this.fault.faultReference = this.faultReference;
      this.fault.referenceDate = this.refDate;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      console.log(this.siteID);
      this.http.get(this.url + 'get-client-sites-client.php?clientID=' + user.id).subscribe((siteResp: any) => {
        console.log(siteResp);
        this.siteData = siteResp;
        this.fault.siteID = siteResp.id;
      });
    });
  }

  submitFaultReport() {
    console.log(this.fault);
    this.http.post(this.url + 'post-fault-request-client.php', this.fault).subscribe((data: any) => {
      console.log(data);
      if (data.status === 'success') {
        this.faultConfirmation('Fault report has been submitted successfully!');
        this.router.navigate(['/client-menu/client-fault-reports']);
      } else {
        this.faultConfirmation('Fault report could not be submitted successfully!');
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

  takePicture2(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType,
      allowEdit: false,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
      console.log( this.photo);
      this.fault.controlPanelPhoto = this.photo;
    }, (err) => {
      console.log(err);
    });
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType,
      allowEdit: false,
      targetWidth: 800,
      targetHeight: 600,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
      console.log( this.photo);
      this.fault.controlPanelPhoto2 = imageData;
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
