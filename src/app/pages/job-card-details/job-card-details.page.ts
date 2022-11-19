import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import { ModalController, ToastController, NavParams, ActionSheetController } from '@ionic/angular';
import { ClientsSignaturePage } from 'src/app/modals/clients-signature/clients-signature.page';
import { OtherSignaturePage } from 'src/app/modals/other-signature/other-signature.page';

import { Camera, PictureSourceType, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';

@Component({
  selector: 'app-job-card-details',
  templateUrl: './job-card-details.page.html',
  styleUrls: ['./job-card-details.page.scss'],
})
export class JobCardDetailsPage implements OnInit {
  jobID: any;
  job: any;
  staff: any;
  minDate: any;
  jobCard: any = {};
  clientSignature: any;
  partySignature: any;
  hideClientBtn: boolean;
  hidePartyBtn: boolean;
  showReturnReason: boolean;
  url = environment.url;
  photo: any;
  afterPhoto: any;
  beforePhoto: any;
  panelPhoto: any;
  database: SQLiteObject;
  networkStatus: any;
  status: any;
  return: any;
  updateData: any;
  beforePhotoBlob: any;
  afterPhotoBlob: any;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private camera: Camera,
    private modalController: ModalController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private sqlite: SQLite,
    private networkCheckerService: NetworkCheckerService
  ) {
    this.minDate = moment(new Date()).format('YYYY-MM-DD');
    console.log(this.minDate);
    this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.http.get(this.url + 'get-job-details.php?jobID=' + this.jobID).subscribe((data: any) => {
      console.log(data);
      this.job = data?.job;
      this.staff = data?.staff;
      this.jobCard = this.job;
      this.jobCard.jobID = this.job.id;
      this.jobCard.arrival_time = this.job.arrival_time;
      this.jobCard.techID = this.job.technician_id;
      this.panelPhoto = this.job.control_panel_photo_2;
    });
    this.hidePartyBtn = false;
    this.hideClientBtn = false;
    this.showReturnReason = false;
    this.jobCard.isReturn = '';
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.http.get(this.url + 'get-job-details.php?jobID=' + this.jobID).subscribe((data: any) => {
      console.log(data);
      this.job = data?.job;
      this.staff = data?.staff;
      this.jobCard = this.job;
      this.jobCard.jobID = this.job.id;
      this.jobCard.arrival_time = this.job.arrival_time;
      this.jobCard.techID = this.job.technician_id;
      this.panelPhoto = this.job.control_panel_photo_2;
    });

    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.getOfflineJobCard();
    }
    const dateCompleted = moment().format('YYYY-MM-d h:mm:ss');
    console.log(dateCompleted);
  }

  getOfflineJobCard() {
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
      console.log(this.jobID);
      // eslint-disable-next-line max-len
      const query = 'SELECT * FROM fire_fault_reports JOIN fire_sites ON fire_fault_reports.site_id = fire_sites.site_id  WHERE fire_fault_reports.fault_id=?';
      this.database.executeSql(query, [this.jobID]).then((res: any) => {
        if (res.rows.length > 0) {
          console.log('Data: ');
          console.log(res.rows.item(0));
          this.job = res.rows.item(0);
          this.jobCard.jobID = this.job.fault_id;
          this.jobCard.arrival_time = this.job.arrival_time;
          this.jobCard.techID = this.job.technician_id;
          this.panelPhoto = this.job.control_panel_photo_2;
        }
      });

      // eslint-disable-next-line max-len
      const queryClient = 'SELECT * FROM fire_users WHERE fire_users.user_id=?';
      this.database.executeSql(queryClient, [this.job.client_id]).then((client: any) => {
        if (client.rows.length > 0) {
          console.log('Clients: ');
          console.log(client.rows.item(0));
          this.staff = client.rows.item(0);
        }
      });
    }).catch(err => {
      console.log('Table fire_fault_reports could not be created' + JSON.stringify(err));
    });
  }

  completeAssignedJobCard() {
    console.log(this.jobCard);
    this.http.post(this.url + 'submit-technician-job.php', this.jobCard).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.systemNotifiy('Job card has been successfully completed!');
        this.router.navigate(['/technician-menu/technician-job-cards']);
      } else {
        this.systemNotifiy('Job card failed to be completed!');
      }
    });
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      console.log(this.jobCard);
      const dateCompleted = moment().format('YYYY-MM-DD HH:mm:ss');
      if (this.jobCard.isReturn && this.jobCard.isReturn !== '' ) {
        this.status = 'Return Visit Required';
        this.return = 'Yes';
      } else {
        this.return = 'No';
        this.status = 'Completed';
      }
      if (this.jobCard.beforePhoto2 && this.jobCard.beforePhoto2 !== '') {
        this.beforePhotoBlob = this.jobCard.beforePhoto2;
      } else {
        this.beforePhotoBlob = '';
      }
      if (this.jobCard.afterPhoto2 && this.jobCard.afterPhoto2 !== '') {
        this.afterPhotoBlob = this.jobCard.afterPhoto2;
      } else {
        this.afterPhotoBlob = '';
      }
      this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
      console.log('Update ID: ' + this.jobID);
      const isSynced = 'No';
      // eslint-disable-next-line max-len
      this.updateData = [this.jobCard.arrival_time,this.status, this.jobCard.work_completed, this.jobCard.general_comments, this.return, this.jobCard.return_details, this.jobCard.clientSignature, this.jobCard.third_party_signature, this.jobCard.third_party_name, this.jobCard.third_party_surname, this.jobCard.third_party_function, this.beforePhotoBlob, this.afterPhotoBlob, this.jobCard.date_signed_off, dateCompleted, isSynced];
      // eslint-disable-next-line max-len
      this.database.executeSql(`UPDATE fire_fault_reports SET arrival_time = ?, status = ?, work_completed=?, general_comments=?, isReturn=?, return_details=?, client_signature=?, third_party_signature=?, third_party_name=?, third_party_surname=?, third_party_function=?, before_photo_blob=?, after_photo_blob=?, date_signed_off=?, date_completed=?, isSynced=?  WHERE fault_id = ${this.jobID}`, this.updateData).then((res: any) => {
        console.log('Updated!!' + JSON.stringify(res));
        this.systemNotifiy('Job card has been successfully completed!');
        this.router.navigate(['/technician-menu/technician-job-cards']);
      }, err => {
        console.log('err: ' + JSON.stringify(err));
      });
    }
  }

  async clientSignOff() {
      const modal = await this.modalController.create({
        component: ClientsSignaturePage,
        componentProps: {
          ref: this.jobCard.jobcard_ref,
        }
      });
      await modal.present();
      modal.onDidDismiss().then((res: any) => {
        console.log(res);
        this.jobCard.clientSignature = res.data.clientSignature;
        this.clientSignature = res.data.clientSignature;
        this.jobCard.date_signed_off = moment().format('YYYY-MM-DD HH:mm:ss');
        this.hideClientBtn  = true;
        this.hidePartyBtn = true;
      });
  }

  async partySignOff() {
    const modal = await this.modalController.create({
      component: OtherSignaturePage,
      componentProps: {
        ref: this.jobCard.jobcard_ref,
      }
    });
    await modal.present();
    modal.onDidDismiss().then((res: any) => {
      console.log(res);
      this.jobCard.thirdPartySignature = res.data.partySignature;
      this.partySignature = res.data.partySignature;
      this.jobCard.partyName = res.data.partyName;
      this.jobCard.partySurname = res.data.partySurname;
      this.jobCard.partyJobFunction = res.data.partyJobFunction;
      this.jobCard.date_signed_off = moment().format('YYYY-MM-DD HH:mm:ss');
      this.hideClientBtn  = true;
      this.hidePartyBtn = true;
    });
  }

  checkBoxChange(ev) {
    console.log(ev.detail.checked);
    if (ev.detail.checked === true) {
      this.showReturnReason = true;
    } else {
      this.showReturnReason = false;
      this.jobCard.return_details = '';
    }
  }

  async systemNotifiy(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration:4000
    });
    toast.present();
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

  takePictureB4(sourceType: PictureSourceType) {
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
      this.jobCard.beforePhoto = this.photo;
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
      this.jobCard.beforePhoto2 = imageData;
    }, (err) => {
      console.log(err);
    });
  }




  async presentAfterActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'MODE',
      buttons: [{
        text: 'Camera',
        role: 'destructive',
        icon: 'camera',
        cssClass: 'actionIcons',
        handler: () => {
          console.log('Take Picture');
          this.afterPicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        cssClass: 'actionIcons',
        handler: () => {
          console.log('Share clicked');
          this.afterPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  afterPicture(sourceType: PictureSourceType) {
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
      this.afterPhoto = 'data:image/jpeg;base64,' + imageData;
      console.log( this.afterPhoto);
      this.jobCard.afterPhoto2 = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  afterPicture2(sourceType: PictureSourceType) {
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
      this.afterPhoto = 'data:image/jpeg;base64,' + imageData;
      console.log( this.afterPhoto);
      this.jobCard.afterPhoto = this.afterPhoto;
    }, (err) => {
      console.log(err);
    });
  }
}
