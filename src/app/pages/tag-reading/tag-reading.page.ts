import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { TagsDataPage } from 'src/app/modals/tags-data/tags-data.page';

import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-reading',
  templateUrl: './tag-reading.page.html',
  styleUrls: ['./tag-reading.page.scss'],
})
export class TagReadingPage implements OnInit {
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

  public siteID: any;
  public deviceNumber: any;
  public deviceType: any;
  public tagMessage: any;
  public tagZone: any;
  public tagDate: any;
  hasData: boolean;

  readingTag = false;
  writingTag = false;
  isWriting = false;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
    private http: HttpClient,
    private platform: Platform,
    public  nfc: NFC,
    public  ndef: Ndef,
    private alertController: AlertController,
    private modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.hasData = false;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if (!this.readingTag) {
      this.nfcReadData();
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
      // eslint-disable-next-line max-len
      console.log('SiteID: ' + this.siteID + ' ---Device Number: ' + this.deviceNumber  + '----Device Type: ' + this.deviceType + '----Message: ' + this.tagMessage + '----Zone: ' + this.tagZone + '----Date: ' + this.tagDate);
    }, err => {
      console.log(err);
    });
  }

  async getTagData(tag) {
    this.siteID  = this.nfc.bytesToString(tag.ndefMessage[0].payload).substring(3);
    this.deviceNumber  = this.nfc.bytesToString(tag.ndefMessage[1].payload).substring(3);
    this.deviceType  = this.nfc.bytesToString(tag.ndefMessage[2].payload).substring(3);
    this.tagMessage  = this.nfc.bytesToString(tag.ndefMessage[3].payload).substring(3);
    this.tagZone  = this.nfc.bytesToString(tag.ndefMessage[4].payload).substring(3);
    this.tagDate  = this.nfc.bytesToString(tag.ndefMessage[5].payload).substring(3);
    // eslint-disable-next-line max-len
    console.log('SiteID: ' + this.siteID + ' ---Device Number: ' + this.deviceNumber  + '----Device Type: ' + this.deviceType + '----Message: ' + this.tagMessage + '----Zone: ' + this.tagZone + '----Date: ' + this.tagDate);
    if (this.siteID !== '') {
      this.openModal(tag);
    }
  }

  async presentAlert(tag1, tag2, tag3,tag4,tag5,tag6) {
    const alert = await this.alertController.create({
      header: 'RFID RESPONSE',
      // eslint-disable-next-line max-len
      message: 'SiteID: ' + tag1 + '<br/> Device Number: ' + tag2 + '<br/>Device Type: ' + tag3 + '<br/>Message: ' + tag4 + '<br/>Zone: ' + tag5 + 'Date: ' + tag6,
      buttons: ['OK']
    });

    await alert.present();
  }

  async openModal(tag) {
    const modal = await this.modalController.create({
      component: TagsDataPage,
      componentProps: {
      siteID: this.nfc.bytesToString(tag.ndefMessage[0].payload).substring(3),
      deviceNumber: this.nfc.bytesToString(tag.ndefMessage[1].payload).substring(3),
      deviceType: this.nfc.bytesToString(tag.ndefMessage[2].payload).substring(3),
      tagMessage: this.nfc.bytesToString(tag.ndefMessage[3].payload).substring(3),
      tagZone: this.nfc.bytesToString(tag.ndefMessage[4].payload).substring(3),
      tagDate: this.nfc.bytesToString(tag.ndefMessage[5].payload).substring(3),
      }
    });
    await modal.present();
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
          // Writing
        }
      }
    }, (err) => {
      this.writingTag = false;
      this.isWriting = false;
    })
    );
  }

  ionViewWillLeave() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  readTag() {
    this.readingTag = true;
  }

  writeTag() {
    this.writingTag = true;
  }

}
