import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import * as moment from 'moment';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-smoke-write-panel',
  templateUrl: './smoke-write-panel.page.html',
  styleUrls: ['./smoke-write-panel.page.scss'],
})
export class SmokeWritePanelPage implements OnInit {
  url = environment.url;
  techID: any;
  panelData: any;
  writingTag = false;
  isWriting = false;

  public siteID: any;
  public certID: any;
  public panelNumber: any;
  public location: any;
  public tagDate: any;
  public serviceID: any;
  public serviceTypeID: any;
  public panelCode: any;
  public itemNumber: any;

  panelsList: any;
  panels: any = {};

  serviceId: any;
  serviceTypeId: any;
  siteId: any;
  writeDate: any;
  listener: any;
  tag: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    public  nfc: NFC,
    public  ndef: Ndef,
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      console.log(res);
      this.serviceId = res.serviceID;
      this.serviceTypeId = res.serviceTypeID;
      this.siteId = res.siteID;
      this.panels.cert_id = this.serviceId;

      // eslint-disable-next-line max-len
      const getUrl = this.url + 'sp-get-service-panels-new.php?serviceID=' + this.serviceId + '&serviceTypeID=' + this.serviceTypeId + '&siteID=' + this.siteId;
      this.http.get(getUrl).subscribe((devices: any) => {
        console.log(devices);
        this.panelsList = devices;
      });
    });
  }

  ngOnInit() {
  }

  writeTag2(panel) {
    console.log(panel);
  }

  writeTag(panelData) {
    this.writeDate = moment().format('DD-MM-YYYY');
    this.tag = panelData?.item;
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
        const siteID = this.ndef.textRecord(this.tag.site_id);
        const panelNumber = this.ndef.textRecord(this.tag.panel_number);
        const panelCode = this.ndef.textRecord(this.tag.panel_code);
        const location = this.ndef.textRecord(this.tag.location);
        const date = this.ndef.textRecord(this.writeDate);
        const serviceID = this.ndef.textRecord(this.tag.cert_id);
        const serviceTypeID = this.ndef.textRecord(this.tag.sp_temp_id);
        console.log('Ready for Writing' + siteID);
        this.nfc.write([siteID,panelNumber, panelCode,location,date,serviceID,serviceTypeID]).then(success => {
          console.log('Writing Complete: ' + success);
          if (success === 'OK') {
            this.presentToast('Successfully written to RFID Chip!');
            this.listener.unsubscribe();
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

  searchDevice(ev) {
    console.log(this.panels);
    const panelCode = ev.detail.value;
    this.http.get(this.url + 'sp-get-device-panel-data-new.php?panelCode=' + panelCode + '&cert_id=' + this.panels.cert_id)
    .subscribe((devices: any) => {
      console.log(devices);
      this.panelsList = devices;
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
