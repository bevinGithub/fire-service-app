import { Storage } from '@ionic/storage';
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tag-writing',
  templateUrl: './tag-writing.page.html',
  styleUrls: ['./tag-writing.page.scss'],
})
export class TagWritingPage implements OnInit {
  url = environment.url;
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

  readingTag = false;
  writingTag = false;
  isWriting = false;
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
    private zone: NgZone
  ) {
    this.writeDate = moment().format('DD-MM-YYYY HH:mm:ss');
    this.tag.writeTime = this.writeDate;
    console.log(this.writeDate);
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.http.get(this.url + 'get-site-writing.php?userID=' + user.id).subscribe((res: any) => {
        console.log(res);
        this.sites = res;
      });
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.testWrite();
  }

  writeTag() {
    console.log(this.tag);
    this.updateTagData(this.tag);
  }

  updateTagData(data){
    this.platform.ready().then(() => {
      this.writingTag = true;
      this.listener = this.nfc.addNdefListener((res: any) => {
        console.log('Bevin: ' + res);
      }, (error) => {
        console.log(error);
      }).subscribe(() => {
        console.log('Ready for Writing');
        const siteID = this.ndef.textRecord(data.siteID);
        const deviceNumber = this.ndef.textRecord(data.deviceNumber);
        const deviceType = this.ndef.textRecord(data.deviceType);
        const message = this.ndef.textRecord(data.deviceMessage);
        const zone = this.ndef.textRecord(data.zone);
        const date = this.ndef.textRecord(data.writeTime);

        this.nfc.write([siteID, deviceNumber,deviceType,zone,message,date]).then(success => {
          console.log('Writing Complete: ' + success);
          if (success === 'OK') {
            this.presentToast('Successfully written to RFID Chip!');
            this.zone.run(() => {
              this.router.navigate(['/technician-menu/technician-dashboard']);
          });
          }
        }).catch(error => {
            console.log(error);
          });
          this.writingTag = false;
      });
    });
  }

  testWrite(){
    this.platform.ready().then(() => {
      this.listener = this.nfc.addNdefListener((res: any) => {
        console.log('Bevin: ' + res);
      }, (error) => {
        console.log(error);
      }).subscribe(() => {
        console.log('Ready for Writing');
        const siteID = this.ndef.textRecord('18');
        const tagNumber = this.ndef.textRecord('1071');
        const deviceNumber = this.ndef.textRecord('1006');
        const deviceType = this.ndef.textRecord('Heat ZP720-3 ');
        const message = this.ndef.textRecord('Deli Kitchen ');
        const zone = this.ndef.textRecord('1');
        const date = this.ndef.textRecord('2022-08-10 17:00:21');
        const serviceID = this.ndef.textRecord('99');
        const serviceTypeID = this.ndef.textRecord('2');
        const empty = this.ndef.textRecord('');

        this.nfc.write([empty]).then(success => {
        // this.nfc.write([siteID,tagNumber, deviceNumber,deviceType,zone,message,date,serviceID,serviceTypeID]).then(success => {
          console.log('Writing Complete: ' + success);
          //this.nfcReadData();

        }).catch(error => {
            console.log(error);
          });
      });
    });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'RFID RESPONSE',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  readUpgrade() {
    this.subscriptions.push(this.nfc.addNdefListener().subscribe(data => {
      if (this.readingTag) {
        const payload = data.tag.ndefMessage[0].payload;
        const tagContent = this.nfc.bytesToString(payload).substring(3);
        this.readingTag = false;
        console.log('tag data', tagContent);
      } else if (this.writingTag) {
        if (!this.isWriting) {
          this.isWriting = true;
          // this.writeTag();
        }
      }
    }, (err) => {
      this.writingTag = false;
      this.isWriting = false;
    })
    );
  }

  ionViewWillLeave() {
    console.log('Leaving Writing State');
    this.listener.unsubscribe();
  }

  readTag() {
    this.readingTag = true;
  }

  writeTag2() {
    this.writingTag = true;
  }
}
