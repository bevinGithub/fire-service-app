import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import * as moment from 'moment';
import { AlertController, Platform, ToastController } from '@ionic/angular';

import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-service-devices',
  templateUrl: './service-devices.page.html',
  styleUrls: ['./service-devices.page.scss'],
})
export class ServiceDevicesPage implements OnInit {
  url = environment.url;
  searchReasult: any;
  queryString: any;
  serviceId: any;
  serviceTypeId: any;
  siteId: any;
  devices: any = {};
  devicesList: any;
  devicesSearch: any[]=[];

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
  public referenceNumber: any;
  writingTag: boolean;
  tagid: any;
  tagdesc: any;
  payload: any;
  listener: any;
  tag: any;
  writeDate: any;

  networkStatus: any;
  database: any;
  databaseD: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    public  nfc: NFC,
    public  ndef: Ndef,
    private zone: NgZone,
    private platform: Platform,
    private toastController: ToastController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
    private alertController: AlertController
  ) {
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    this.activatedRoute.queryParams.subscribe((res: any) => {
      console.log(res);
      this.serviceId = res.serviceID;
      this.serviceTypeId = res.serviceTypeID;
      this.siteId = res.siteID;
      this.devices.cert_id = this.serviceId;
      this.devices.siteID = this.siteId;
      this.devices.serviceTypeID = this.serviceTypeId;
      // eslint-disable-next-line max-len
      const getUrl = this.url + 'sp_get_service_devices-new-2.php?serviceID=' + this.serviceId + '&serviceTypeID=' + this.serviceTypeId + '&siteID=' + this.siteId;
      this.http.get(getUrl).subscribe((devices: any) => {
        console.log(devices);
        this.devicesList = devices;
      });
      //Get Offline get devices
      if (this.networkStatus === 'none') {
        this.sqlite.create({
          name: 'fireservices.db',
          location: 'default',
        }).then((db: SQLiteObject) => {
          this.database = db;
          const scQuery = 'SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=?';
          this.database.executeSql(scQuery, [this.serviceTypeId,this.siteId]).then((scRes: any) => {
            const sites = [];
            if (scRes.rows.length > 0) {
              for(let i=0; i < scRes.rows.length; i++) {
                this.devicesSearch.push(scRes.rows.item(i));
              }
              this.devicesList =  this.devicesSearch;
            } else {
              this.devicesList =  [];
            }
          });
        });
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
  }

  searchDevice(ev) {
    console.log(this.devices);
    const addr = ev.detail.value;
    this.http.get(this.url + 'sp-get-device-data-new.php?addr=' + addr + '&cert_id=' + this.devices.cert_id).subscribe((devices: any) => {
      console.log(devices);
      this.devicesList = devices;
    });
    if (this.networkStatus === 'none') {
      this.sqlite.create({
        name: 'fireservices.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        this.databaseD = db;

        const serviceTypeId = this.devices.serviceTypeID;
        const siteid = this.devices.siteID;
        const add = this.devices.addr;
        const scQuery2 = 'SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND addr=?';
        this.databaseD.executeSql(scQuery2, [serviceTypeId, siteid, add]).then((dev: any) => {
          const sites = [];
          if (dev.rows.length > 0) {
            for(let i=0; i < dev.rows.length; i++) {
              sites.push(dev.rows.item(i));
            }
            this.devicesList =  sites;
          } else {
            this.devicesList =  [];
          }
        });

      });
    }
  }

  searchDevice2(ev) {
    const addr = ev.detail.value;
    this.http.get(this.url + 'sp-get-device-data-new.php?addr=' + addr + '&cert_id=' + this.devices.cert_id).subscribe((devices: any) => {
      console.log(devices);
      this.devicesList = devices;
    });
    if (this.networkStatus === 'none') {
      this.sqlite.create({
        name: 'fireservices.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        this.databaseD = db;

        const serviceTypeId = this.devices.serviceTypeID;
        const siteid = this.devices.siteID;
        const add = this.devices.addr;
        const scQuery2 = 'SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND addr=?';
        //alert(scQuery2 + '---' + serviceTypeId + '---' + siteid + '---' + add);
        this.databaseD.executeSql(scQuery2, [serviceTypeId, siteid, add]).then((dev: any) => {
          const sites = [];
          if (dev.rows.length > 0) {
            //alert(dev.rows.length);
            for(let i=0; i < dev.rows.length; i++) {
              sites.push(dev.rows.item(i));
            }
            this.devicesList =  sites;
          } else {
            this.devicesList =  [];
          }
        });

      });
    }
  }

  writeTag(tagData) {
    this.writeDate = moment().format('DD-MM-YYYY HH:mm:ss');
    this.tag = tagData?.item;
    this.platform.ready().then(() => {
      this.writingTag = true;
      this.listener = this.nfc.addNdefListener((res: any) => {
        console.log('Listener is Active: ' + res);
      }, (error: any) => {
        this.presentToast(error);
      }).subscribe(() => {
        const referenceNumber = this.ndef.textRecord(this.tag?.reference_number);
        const date = this.ndef.textRecord(this.writeDate);
        const serviceTypeID = this.ndef.textRecord(this.tag?.service_type_id);
        this.nfc.write([referenceNumber, date,serviceTypeID]).then(success => {
          if (success === 'OK') {
            this.listener.unsubscribe();
            this.tag = '';
            this.presentToast('Successfully written to RFID Tag!');
          } else {
            this.presentToast('Could not write to tag sucessfully!');
          }
        }).catch(error => {
            if (error === null) {
              this.presentToast('Tag could not be written!');
            }
            if (error === 'Only one Tag Technology can be connected at a time.') {
              this.presentToast('Failed to write to tag sucessfully, please try again!');
            }
          });
      }, err => {
        this.presentToast(JSON.stringify(err));
      });
    });
  }

  async flashMessage(ref: string) {
    const alert = await this.alertController.create({
      header: 'Tag Data Written',
      message: 'Tag Reference: ' + ref,
      buttons: ['OK']
    });
    await alert.present();
  }

  // writeTag2(tagData) {
  //   this.writeDate = moment().format('DD-MM-YYYY');
  //   this.tag = tagData?.item;
  //   console.log(this.tag);
  //   this.platform.ready().then(() => {
  //     this.writingTag = true;
  //     this.listener = this.nfc.addNdefListener((res: any) => {
  //       console.log('Listener is Active: ' + res);
  //     }, (error) => {
  //       console.log(error);
  //       this.presentToast(error);
  //     }).subscribe(() => {
  //       console.log('Ready for Writing');
  //       const siteID = this.ndef.textRecord(this.tag.site_id);
  //       const tagNumber = this.ndef.textRecord(this.tag.rftag);
  //       const deviceNumber = this.ndef.textRecord(this.tag.addr);
  //       const deviceType = this.ndef.textRecord(this.tag.device_type);
  //       const message = this.ndef.textRecord(this.tag.device_message);
  //       const zone = this.ndef.textRecord(this.tag.zone);
  //       const date = this.ndef.textRecord(this.writeDate);
  //       const serviceID = this.ndef.textRecord(this.tag.cert_id);
  //       const serviceTypeID = this.ndef.textRecord(this.tag.service_type_id);
        // eslint-disable-next-line max-len
  //       console.log(this.tag.site_id +' ----' +this.tag.rftag +' ----' + this.tag.addr +' ----' + this.tag.device_type +' ----' + this.tag.zone +' ----' + this.tag.device_message);
  //       this.nfc.write([siteID,tagNumber, deviceNumber,deviceType,zone,message,date,serviceID,serviceTypeID]).then(success => {
  //         if (success === 'OK') {
  //           console.log('Writing Complete: ' + success);
  //           this.presentToast('Successfully written to RFID Tag!');
  //           this.listener.unsubscribe();
  //           console.log('Unsubscribe listener!!');
  //         }
  //       }).catch(error => {
  //           console.log(error);
  //           if (error === null) {
  //             this.presentToast('Tag could not be written!');
  //           }
  //           if (error === 'Only one TagTechnology can be connected at a time.') {
  //             console.log('Could not write to tag sucessfully, please try again!');
  //             this.presentToast('Could not write to tag sucessfully, please try again!');
  //           }
  //         });
  //     });
  //   });
  // }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  ionViewWillLeave() {
    this.listener.unsubscribe();
  }

}
