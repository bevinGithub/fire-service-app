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

import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { TagsVentDataPage } from 'src/app/modals/tags-vent-data/tags-vent-data.page';

@Component({
  selector: 'app-smoke-read-write-vent',
  templateUrl: './smoke-read-write-vent.page.html',
  styleUrls: ['./smoke-read-write-vent.page.scss'],
})
export class SmokeReadWriteVentPage implements OnInit {
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

  panelsList: any;

  public siteID: any;
  public certID: any;
  public ventNumber: any;
  public location: any;
  public tagDate: any;
  public serviceID: any;
  public serviceTypeID: any;
  public ventCode: any;
  public cpID: any;
  public audioSound: any;

  showDevice = false;
  readingTag = false;
  writingTag = false;
  isWriting = false;
  audio: any;
  songs: any;
  networkStatus: any;
  database: any;
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
    private audioService: AudioService,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.state = this.activatedRoute.snapshot.paramMap.get('state');
    console.log(this.state);
    if (this.state === 'read') {
      this.pageTitle = 'READING RFID: VENT';
      this.readingTag = true;
      this.nfcReadData();
    }
    if (this.state === 'write') {
      this.pageTitle = 'WRITING TO RFID: VENT';
      this.writingTag = true;
    }

    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);

    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.techID = user?.id;
      this.writeDate = moment().format('DD-MM-YYYY');
      this.tag.writeTime = this.writeDate;
      console.log(this.writeDate);
      this.http.get(this.url + 'sp-get-site-writing-sc.php?userID=' + user.id).subscribe((res: any) => {
        console.log(res);
        this.sites = res;
      });
    });

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
    if (tag.ndefMessage[2]) {
      this.ventCode  = this.nfc.bytesToString(tag.ndefMessage[2].payload).substring(3);
    } else {
      this.ventCode = '';
    }
    if (tag.ndefMessage[1]) {
      this.ventNumber  = this.nfc.bytesToString(tag.ndefMessage[1].payload).substring(3);
    } else {
      this.ventNumber = '';
    }
    if (tag.ndefMessage[3]) {
      this.location  = this.nfc.bytesToString(tag.ndefMessage[3].payload).substring(3);
    } else {
      this.location = '';
    }
    if (tag.ndefMessage[4]) {
      this.tagDate  = this.nfc.bytesToString(tag.ndefMessage[4].payload).substring(3);
    } else {
      this.tagDate = '';
    }
    if (tag.ndefMessage[5]) {
      this.serviceID  = this.nfc.bytesToString(tag.ndefMessage[5].payload).substring(3);
    } else {
      this.serviceID = '';
    }
    if (tag.ndefMessage[6]) {
      this.serviceTypeID  = this.nfc.bytesToString(tag.ndefMessage[6].payload).substring(3);
    } else {
      this.serviceTypeID  = '';
    }
    if (tag.ndefMessage[7]) {
      this.cpID  = this.nfc.bytesToString(tag.ndefMessage[7].payload).substring(3);
    } else {
      this.cpID  = '';
    }
    // eslint-disable-next-line max-len
    console.log('SiteID: ' + this.siteID + ' ---Vent Code: ' + this.ventCode + ' ---Vent Number: ' + this.ventNumber  + '----Location: ' + this.location + '----: Date Scanned: '
    + this.tagDate + '------: Cert ID: ' + this.serviceID + '--- Service Type ID: ' + this.serviceTypeID + '------CPID: ' + this.cpID);
    if (this.siteID !== '' && this.serviceID === '' && this.serviceTypeID === '') {
      this.openModal(tag);
    } else if (this.siteID !== '' && this.serviceID !== '' && this.serviceTypeID !== '') {
      const readData = {
        siteID: this.siteID,
        serviceID: this.serviceID,
        serviceTypeID: this.serviceTypeID,
        ventCode: this.ventCode,
        ventNumber: this.ventNumber,
        location: this.location,
        techID: this.techID,
        cpID: this.cpID,
      };
      console.log(readData);
      this.http.post(this.url + 'sp-post-tag-vent-data.php', readData).subscribe((data: any) => {
        console.log(data);
        this.deviceData = data;
        if (data !== 'No Record Found') {
          this.showDevice = true;
        } else {
          //EMPTY SCAN RESULTS
          this.alertPlaySound('Scan result is empty!');
        }
      });
      if (this.networkStatus === 'none') {
        console.log(this.serviceID);
        const scQuery = 'SELECT * FROM fire_sp_service_certificates WHERE cert_id=?';
        this.database.executeSql(scQuery, [this.serviceID]).then((scRes: any) => {
          console.log(scRes);
          const certs = [];
          for(let i=0; i < scRes.rows.length; i++) {
            certs.push(scRes.rows.item(i));
          }
        });
      }
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
    if (tag.ndefMessage[2]) {
      this.ventCode  = this.nfc.bytesToString(tag.ndefMessage[2].payload).substring(3);
    } else {
      this.ventCode = '';
    }
    if (tag.ndefMessage[1]) {
      this.ventNumber  = this.nfc.bytesToString(tag.ndefMessage[1].payload).substring(3);
    } else {
      this.ventNumber = '';
    }
    if (tag.ndefMessage[3]) {
      this.location  = this.nfc.bytesToString(tag.ndefMessage[3].payload).substring(3);
    } else {
      this.location = '';
    }
    if (tag.ndefMessage[4]) {
      this.tagDate  = this.nfc.bytesToString(tag.ndefMessage[4].payload).substring(3);
    } else {
      this.tagDate = '';
    }
    if (tag.ndefMessage[5]) {
      this.serviceID  = this.nfc.bytesToString(tag.ndefMessage[5].payload).substring(3);
    } else {
      this.serviceID = '';
    }
    if (tag.ndefMessage[6]) {
      this.serviceTypeID  = this.nfc.bytesToString(tag.ndefMessage[6].payload).substring(3);
    } else {
      this.serviceTypeID  = '';
    }
    const modal = await this.modalController.create({
      component: TagsVentDataPage,
      componentProps: {
      siteID: this.siteID,
      ventCode: this.ventCode,
      ventNumber: this.ventNumber,
      location: this.location,
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
      const ventNumber = this.ndef.textRecord(this.tag.ventNumber);
      const ventCode = this.ndef.textRecord(this.tag.ventCode);
      const location = this.ndef.textRecord(this.tag.location);
      const date = this.ndef.textRecord(this.tag.writeTime);
      const serviceID = this.ndef.textRecord(this.tag.serviceID);
      const serviceTypeID = this.ndef.textRecord(this.tag.serviceTypeID);
      const cpID = this.ndef.textRecord(this.tag.cpID);
      console.log('Ready for Writing' + siteID);
      this.nfc.write([siteID,ventNumber, ventCode,location,date,serviceID,serviceTypeID,cpID]).then(success => {
        console.log('Writing Complete: ' + success);
        if (success === 'OK') {
          this.presentToast('Successfully written to RFID Tag!');
          this.listener.unsubscribe();
          console.log('Unsubscribe listener!!');
          this.zone.run(() => {
            this.tag = '';
            this.router.navigate(['/technician-menu/technician-dashboard']);
          });
        }
      }).catch(error => {
        console.log(error);
        if (error === null) {
          this.presentToast('Tag could not be written!');
        }
        if (error === 'Only one TagTechnology can be connected at a time.') {
          console.log('Could not write to tag sucessfully, please try again!');
          this.presentToast('Could not write to tag sucessfully, please try again!');
        }
      });
    });
  });
}

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
    this.http.get(this.url + 'get-smoke-panels-list.php?id=' + certID).subscribe((data: any) => {
      console.log(data);
      this.tag.serviceTypeID = data?.certificate.service_type_id;
      this.tag.siteID = data?.site.id;
      this.panelsList = data?.panels;
    });
  }

  ionViewDidLeave(){
    this.audioService.stopAlertSound('alert');
  }

}
