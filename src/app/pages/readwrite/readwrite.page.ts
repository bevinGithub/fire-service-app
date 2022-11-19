import { Storage } from '@ionic/storage';
import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController, Platform, RouterCustomEvent, ToastController } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagsDataPage } from 'src/app/modals/tags-data/tags-data.page';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-readwrite',
  templateUrl: './readwrite.page.html',
  styleUrls: ['./readwrite.page.scss'],
})
export class ReadwritePage implements OnInit, AfterViewInit {
  url = environment.url;
  techID: any;
  deviceData: any;
  config: any;
  flags: any;
  readerMode: any;
  message: any;
  msg: any;

  tagid: any;
  tagdesc: any;
  payload: any;
  listener: any;
  tag: any = {};
  writeDate: any;
  sites: any;

  state: any;
  pageTitle: any;

  public siteID: any;
  public certID: any;
  public deviceNumber: any;
  public deviceType: any;
  public tagMessage: any;
  public tagZone: any;
  public tagDate: any;
  public serviceID: any;
  public serviceTypeID: any;
  public tagNumber: any;
  public audioSound: any;

  showDevice = false;
  readingTag = false;
  writingTag = false;
  isWriting = false;
  audio: any;
  songs: any;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private http: HttpClient,
    private platform: Platform,
    public  nfc: NFC,
    public  ndef: Ndef,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private audioService: AudioService
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.techID = user?.id;
      this.writeDate = moment().format('DD-MM-YYYY');
      this.tag.writeTime = this.writeDate;
      console.log(this.writeDate);
      this.http.get(this.url + 'get-site-writing.php?userID=' + user.id).subscribe((res: any) => {
        console.log(res);
        this.sites = res;
      });
    });
  }

  ngOnInit() {

  }
  // Load the Audio
  ngAfterViewInit(){
    // this.audioService.preloadAlertSound('alert', 'assets/audio/notify.wav');
    this.audioService.preloadAlertSound('alert', 'assets/audio/beep.mp3');
  }

  ionViewWillEnter(){
    this.state = this.activatedRoute.snapshot.paramMap.get('state');
    console.log(this.state);
    if (this.state === 'read') {
      this.pageTitle = 'READING RFID';
      this.readingTag = true;
      // this.readWrite();
      this.nfcReadData();
    }
    if (this.state === 'write') {
      this.pageTitle = 'WRITING TO RFID';
      this.writingTag = true;
    }
  }

  nfcReadData() {
    console.log('Reader Initializing');
    // eslint-disable-next-line no-bitwise
    this.flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode = this.nfc.readerMode(this.flags).subscribe((tag: any) => {
      console.log(JSON.stringify(tag));
      console.log(tag);
      this.readingTag = false;
      this.getTagData(tag);
      this.readingTag = false;
    }, err => {
      console.log(err);
    });
  }

  async getTagData(tag) {
    if (tag.ndefMessage[0]) {
      this.siteID  = this.nfc.bytesToString(tag.ndefMessage[0].payload).substring(3);
    } else {
      this.siteID = '';
    }
    if (tag.ndefMessage[1]) {
      this.tagNumber  = this.nfc.bytesToString(tag.ndefMessage[1].payload).substring(3);
    } else {
      this.tagNumber = '';
    }
    if (tag.ndefMessage[2]) {
      this.deviceNumber  = this.nfc.bytesToString(tag.ndefMessage[2].payload).substring(3);
    } else {
      this.deviceNumber = '';
    }
    if (tag.ndefMessage[3]) {
      this.deviceType  = this.nfc.bytesToString(tag.ndefMessage[3].payload).substring(3);
    } else {
      this.deviceType = '';
    }
    if (tag.ndefMessage[4]) {
      this.tagZone  = this.nfc.bytesToString(tag.ndefMessage[4].payload).substring(3);
    } else {
      this.tagZone = '';
    }
    if (tag.ndefMessage[5]) {
      this.tagMessage  = this.nfc.bytesToString(tag.ndefMessage[5].payload).substring(3);
    } else {
      this.tagMessage = '';
    }
    if (tag.ndefMessage[6]) {
      this.tagDate  = this.nfc.bytesToString(tag.ndefMessage[6].payload).substring(3);
    } else {
      this.tagDate = '';
    }
    if (tag.ndefMessage[7]) {
      this.serviceID  = this.nfc.bytesToString(tag.ndefMessage[7].payload).substring(3);
    } else {
      this.serviceID = '';
    }
    if (tag.ndefMessage[8]) {
      this.serviceTypeID  = this.nfc.bytesToString(tag.ndefMessage[8].payload).substring(3);
    } else {
      this.serviceTypeID  = '';
    }
    // eslint-disable-next-line max-len
    console.log('SiteID: ' + this.siteID + ' ---Tag Number: ' + this.tagNumber + ' ---Device Number: ' + this.deviceNumber  + '----Device Type: ' + this.deviceType + '----Message: '
    + this.tagMessage + '----Zone: ' + this.tagZone + '----Date: ' + this.tagDate + '----SCert: '
    + this.serviceID + '----STypeCert: ' + this.serviceTypeID);
    if (this.siteID !== '' && this.serviceID === '' && this.serviceTypeID === '') {
      this.openModal(tag);
    } else if (this.siteID !== '' && this.serviceID !== '' && this.serviceTypeID !== '') {
      const readData = {
        siteID: this.siteID,
        serviceID: this.serviceID,
        serviceTypeID: this.serviceTypeID,
        tagNumber: this.tagNumber,
        deviceNumber: this.deviceNumber,
        tagMessage: this.tagMessage,
        techID: this.techID,
      };
      console.log(readData);
      this.http.post(this.url + 'post-tag-data.php', readData).subscribe((data: any) => {
        console.log(data);
        this.deviceData = data;
        if (data !== 'No Record Found') {
          this.showDevice = true;
        } else {
          //EMPTY SCAN RESULTS
          this.alertPlaySound('Scan result is empty!');
        }
      });
      this.openModal(tag);
    } else {
      this.presentAlert('Tag is Empty');
    }
  }

  async masterAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    await alert.present();
  }

  playTones() {
    this.alertPlaySound('Scan result is empty!');
  }

  async alertPlaySound(msg) {
    const alert = await this.alertController.create({
      cssClass: 'timerAlert',
      subHeader: 'Scan Results',
      message: msg,
      buttons: [
        {
          text: 'Dismiss',
          handler: () => {
            console.log('Stop playing sounf');
            this.audioService.stopAlertSound('alert');
          }
        }
      ]
    });
    // PLAY THE SOUNF
    this.audioService.playAlertSound('alert');
    await alert.present();
  }

  async openModal(tag) {
    if (tag.ndefMessage[0]) {
      this.siteID  = this.nfc.bytesToString(tag.ndefMessage[0].payload).substring(3);
    } else {
      this.siteID = '';
    }
    if (tag.ndefMessage[1]) {
      this.tagNumber  = this.nfc.bytesToString(tag.ndefMessage[1].payload).substring(3);
    } else {
      this.tagNumber = '';
    }
    if (tag.ndefMessage[2]) {
      this.deviceNumber  = this.nfc.bytesToString(tag.ndefMessage[2].payload).substring(3);
    } else {
      this.deviceNumber = '';
    }
    if (tag.ndefMessage[3]) {
      this.deviceType  = this.nfc.bytesToString(tag.ndefMessage[3].payload).substring(3);
    } else {
      this.deviceType = '';
    }
    if (tag.ndefMessage[4]) {
      this.tagZone  = this.nfc.bytesToString(tag.ndefMessage[4].payload).substring(3);
    } else {
      this.tagZone = '';
    }
    if (tag.ndefMessage[5]) {
      this.tagMessage  = this.nfc.bytesToString(tag.ndefMessage[5].payload).substring(3);
    } else {
      this.tagMessage = '';
    }
    if (tag.ndefMessage[6]) {
      this.tagDate  = this.nfc.bytesToString(tag.ndefMessage[6].payload).substring(3);
    } else {
      this.tagDate = '';
    }
    if (tag.ndefMessage[7]) {
      this.serviceID  = this.nfc.bytesToString(tag.ndefMessage[7].payload).substring(3);
    } else {
      this.serviceID = '';
    }
    if (tag.ndefMessage[8]) {
      this.serviceTypeID  = this.nfc.bytesToString(tag.ndefMessage[8].payload).substring(3);
    } else {
      this.serviceTypeID  = '';
    }
    const modal = await this.modalController.create({
      component: TagsDataPage,
      componentProps: {
      siteID: this.siteID,
      tagNumber: this.tagNumber,
      deviceNumber: this.deviceNumber,
      deviceType: this.deviceType,
      tagZone: this.tagZone,
      tagMessage: this.tagMessage,
      tagDate: this.tagDate,
      serviceID: this.serviceTypeID,
      serviceTypeID: this.serviceID,
      }
    });
    await modal.present();
  }

//WRITE TO TAG
writeTag() {
  console.log(this.tag);
  // this.updateTagData(this.tag);
  this.platform.ready().then(() => {
    this.writingTag = true;
    this.listener = this.nfc.addNdefListener((res: any) => {
      console.log('Listener is Active: ' + res);
    }, (error) => {
      console.log(error);
      this.presentToast(error);
    }).subscribe(() => {
      console.log('Ready for Writing');
      const siteID = this.ndef.textRecord(this.tag.siteID);
      const tagNumber = this.ndef.textRecord(this.tag.tagNumber);
      const deviceNumber = this.ndef.textRecord(this.tag.deviceNumber);
      const deviceType = this.ndef.textRecord(this.tag.deviceType);
      const message = this.ndef.textRecord(this.tag.deviceMessage);
      const zone = this.ndef.textRecord(this.tag.zone);
      const date = this.ndef.textRecord(this.tag.writeTime);
      const serviceID = this.ndef.textRecord(this.tag.serviceID);
      const serviceTypeID = this.ndef.textRecord(this.tag.serviceTypeID);

      this.nfc.write([siteID,tagNumber, deviceNumber,deviceType,zone,message,date,serviceID,serviceTypeID]).then(success => {
        console.log('Writing Complete: ' + success);
        if (success === 'OK') {
          this.presentToast('Successfully written to RFID Chip!');
          this.listener.unsubscribe();
          this.zone.run(() => {
            this.tag = '';
            this.router.navigate(['/technician-menu/technician-dashboard']);
          });
        }
      }).catch(error => {
          console.log(error);
          this.presentToast(error);
        });
    }, err => {
      this.presentToast(err);
      console.log('Subscribe: ' + err);
    });
  });
}

// Moved Up one step  13 September 2022 to write tag
// updateTagData(data){
//   this.platform.ready().then(() => {
//     this.writingTag = true;
//     this.listener = this.nfc.addNdefListener((res: any) => {
//       console.log('Listener is Active: ' + res);
//     }, (error) => {
//       console.log(error);
//       this.presentToast(error);
//     }).subscribe(() => {
//       console.log('Ready for Writing');
//       const siteID = this.ndef.textRecord(data.siteID);
//       const tagNumber = this.ndef.textRecord(data.tagNumber);
//       const deviceNumber = this.ndef.textRecord(data.deviceNumber);
//       const deviceType = this.ndef.textRecord(data.deviceType);
//       const message = this.ndef.textRecord(data.deviceMessage);
//       const zone = this.ndef.textRecord(data.zone);
//       const date = this.ndef.textRecord(data.writeTime);
//       const serviceID = this.ndef.textRecord(data.serviceID);
//       const serviceTypeID = this.ndef.textRecord(data.serviceTypeID);

//       this.nfc.write([siteID,tagNumber, deviceNumber,deviceType,zone,message,date,serviceID,serviceTypeID]).then(success => {
//         console.log('Writing Complete: ' + success);
//         if (success === 'OK') {
//           this.presentToast('Successfully written to RFID Chip!');
//           this.listener.unsubscribe();
//           this.zone.run(() => {
//             this.tag = '';
//             this.router.navigate(['/technician-menu/technician-dashboard']);
//           });
//         }
//       }).catch(error => {
//           console.log(error);
//           this.presentToast(error);
//         });
//     }, err => {
//       this.presentToast(err);
//       console.log('Subscribe: ' + err);
//     });
//   });
// }

// async presentAlert2(msg) {
//   const alert = await this.alertController.create({
//     header: 'RFID RESPONSE',
//     message: msg,
//     buttons: ['OK']
//   });

//   await alert.present();
// }

async presentAlert(msg) {
  const alert = await this.alertController.create({
    header: 'RFID RESPONSE',
    message: msg,
    buttons: [
      {
        text: 'Dismiss',
        handler: () => {
          this.audioService.stopAlertSound('alert');
        }
      }
    ]
  });
  // PLAY THE SOUND
  this.audioService.playAlertSound('alert');
  await alert.present();
}

async presentToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

  ionViewWillLeave() {
      if (this.state === 'write') {
        console.log('Leaving Writing State');
        this.listener.unsubscribe();
      }
      if (this.state === 'read') {
        this.readerMode.unsubscribe();
        console.log('Leaving Reading State');
      }
  }

  getCertificateData(ev) {
    console.log(ev.detail);
    const certID = ev.detail.value;
    this.http.get(this.url + 'get-rfid-certificate.php?id=' + certID).subscribe((data: any) => {
      console.log(data);
      this.tag.serviceTypeID = data?.certificate.service_type_id;
      this.tag.siteID = data?.site.id;
    });
  }

  ionViewDidLeave(){
    this.audioService.stopAlertSound('alert');
  }

}
