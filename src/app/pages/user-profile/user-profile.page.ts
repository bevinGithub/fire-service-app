import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Camera, PictureSourceType, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  url = environment.url;
  staff: any;
  sites: any;
  roleID: any;
  photo: any;
  user: any = {};
  link: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
  ) {
    this.link = environment.url;
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((user: any) => {
        this.roleID = user.role_id;
        this.http.get(this.url + 'get-user.php?userID=' + user.id).subscribe((data: any) => {
          console.log(data);
          this.staff = data.user;
          this.sites = data.sites;
        });
      });
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserData();
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
    this.storage.get('currentUser').then((user: any) => {
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
        const postData = {
          userID: user.id, profileImage: this.photo,  basePhoto: imageData
        };
        this.http.post(this.url + 'sp-staff-process-photo.php', postData).subscribe((data: any) => {
          console.log(data);
          this.getUserData();
        });
      }, (err) => {
        console.log(err);
      });
    });
  }


  async faultConfirmation(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

  getUserData() {
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((user: any) => {
        this.roleID = user.role_id;
        this.http.get(this.url + 'sp-get-user.php?userID=' + user.id).subscribe((data: any) => {
          console.log(data);
          this.staff = data.user;
          this.sites = data.sites;
        });
      });
    });
  }

}
