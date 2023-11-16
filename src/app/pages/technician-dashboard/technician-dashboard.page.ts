import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Component, OnInit } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { FormGroup } from '@angular/forms';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: 'app-technician-dashboard',
  templateUrl: './technician-dashboard.page.html',
  styleUrls: ['./technician-dashboard.page.scss'],
})
export class TechnicianDashboardPage implements OnInit {
  url = environment.url;
  config: any;
  flags: any;
  readerMode: any;
  message: any;
  msg: any;

  tagid: any;
  tagdesc: any;
  payload: any;
  networkStatus: any;
  isConnected: any;
  database: SQLiteObject;
  devices: any;
  deviceKnocks: any;
  sounderKnocks: any;
  wireless: any;
  cards: any;
  form: FormGroup;
  showBuetoothBtn: boolean;
  modules: any;
  deviceTags: any = {};

  devicesArray: any[]=[];
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private platform: Platform,
    public  nfc: NFC,
    public  ndef: Ndef,
    private alertController: AlertController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
    private nativeSettings: OpenNativeSettings,
    private modalController: ModalController,
    private device: Device,
    private loadingController: LoadingController
  ) {
    this.storage.get('currentUser').then((user: any) => {
      this.platform.ready().then(() => {
      OneSignal.getDeviceState((stateChanges: any) => {
        const userID = user?.id;
        const playerID = stateChanges.userId;
        const posttData = {
          userId: userID,
          playerId: playerID
        };
        //alert(JSON.stringify(posttData));
        this.http.post(this.url + 'sp-update-onesignal-data.php', posttData).subscribe((res: any) => {
          console.log(res);
        });
      });

    });
      this.getActiveModules(user?.id);
    });
    this.showBuetoothBtn = false;
   }

  ngOnInit() {

  }

  openSettings() {
    //airplane_mode
    this.nativeSettings.open('wifi').then((res: any) => {
      console.log('Output: ' + res);
    });
  }
  openMobileDataSettings() {
    this.nativeSettings.open('accessibility').then((res: any) => {
      console.log('Output: ' + res);
    });
  }

  async openSettings2() {
    const alert = await this.alertController.create({
      message: 'Switch Off Wifi & Mobile Data',
      buttons: [
        {
          text: 'Wifi',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // this.openWifiSettings();
          }
        }, {
          text: 'Mobile Data',
          handler: () => {
            this.openMobileDataSettings();
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((user: any) => {
      this.getActiveModules(user?.id);
    });
    this.networkStatus = this.networkCheckerService.isConnected();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none' || this.networkStatus === 'undefined' || this.networkStatus === 'unknown') {
      this.showBuetoothBtn = true;
    } else {
      this.showBuetoothBtn = false;
    }

    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
     }).then((db: SQLiteObject) => {
       this.database = db;
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_sp_template_device_loops_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id INTEGER,
        sp_id INTEGER,
        admin_id INTEGER,
        tech_id INTEGER,
        service_type_id INTEGER,
        site_id INTEGER,
        panel_id INTEGER,
        reference_number TEXT,
        panel_line TEXT,
        rftag TEXT,
        addr TEXT,
        zone TEXT,
        device_type TEXT,
        device_message TEXT,
        cleaned TEXT,
        tested TEXT,
        correct_message TEXT,
        new_message TEXT,
        na TEXT,
        date_scanned TEXT,
        isSync TEXT,
        date_created TEXT )`, []).then((res: any) => {
        });

        this.loadDevices();
     });
     //
  }

  ionViewDidEnter(){
    this.networkStatus = this.networkCheckerService.isConnected();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none' || this.networkStatus === 'unknown') {
      this.showBuetoothBtn = true;
    } else {
      this.showBuetoothBtn = false;
    }
    this.checkAndroidVersion();
  }

  checkAndroidVersion() {
    if (this.platform.is('android')) {
        console.log('True Android');
        const deviceVersion = this.device.version;
    }
  }

    //GET ACTIVE MODULES
    getActiveModules(techID) {
      this.http.get(this.url + 'sp-get-tech-active-modules.php?techID=' + techID).subscribe((mod: any) => {
        console.log(mod);
        this.modules = mod;
      });
    }

  getDevices() {
    const deviceSql = 'SELECT * FROM fire_sp_template_device_loops_table';
    this.database.executeSql(deviceSql, []).then((resA: any) => {
        console.log('Devices Found: ' + JSON.stringify(resA));
        if (resA.rows.length > 0) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < resA.rows.length; i++) {
            console.log(resA.rows.item(i));
          }
        }
      }, err => {
        console.log('Error Devices Not Found: ' + JSON.stringify(err));
      });
  }

  dropTable() {
    this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table`)
      .then((resA: any) => {
        console.log('Service Cards Found: ' + JSON.stringify(resA));
        if (resA.rows.length > 0) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < resA.rows.length; i++) {
            console.log(resA);
          }
        } else {
          console.log('New Record!!!');
          const isSync = 'No';
        }
      }, err => {
        console.log('Error Service Cards Found: ' + JSON.stringify(err));
      });
  }

  async loadDevices() {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.http.get(this.url + 'sp-get-service-cards-assigned-6.php?techID=' + user.id).subscribe((data: any) => {
        this.cards = data;
        console.log(this.cards);
        if (this.cards !== 'No record Found') {
          // eslint-disable-next-line guard-for-in, @typescript-eslint/prefer-for-of
          for (let i = 0; i < this.cards.length; i++) {
            // eslint-disable-next-line max-len
            console.log('Service Type ID: ' + this.cards[i].service_type_id + '- SITEID: ' + this.cards[i].site_id + ' CertID: ' + this.cards[i].id );
            // eslint-disable-next-line max-len
            this.http.get(this.url + 'sp-get-devices-new.php?serviceTypeID=' + this.cards[i].service_type_id + '&siteID=' +  this.cards[i].site_id).subscribe((res: any) => {
              this.devices = res.devices;
              console.log(this.devices);

              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let a = 0; a < this.devices.length; a++) {
                console.log('Device ID: ' + Number(this.devices[a]?.id));
                if(!this.devicesArray.includes(Number(this.devices[a]?.reference_number))) {
                  this.devicesArray.push(this.devices[a]);
                }
              }
            });
          }
        }
      }, err => {
        console.log(err);
      });
    });

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let j = 0; j < this.devicesArray.length; j++) {
      // eslint-disable-next-line max-len
      this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE device_id=? LIMIT 1`,[Number(this.devicesArray[j]?.id)])
      .then((resA: any) => {
        console.log('Devices Returned: ' + resA.rows.length);
        if (resA.rows.length > 0) {
          console.log(resA.rows.item(0));
          const deviceId = resA.rows.item(0)?.device_id;
          const id = Number(resA.rows.item(0)?.id);
          console.log(id);
          const spId = this.devicesArray[j]?.sp_id;
          const techId = this.devicesArray[j]?.tech_id;
          const serviceTypeId = this.devicesArray[j]?.service_type_id;
          const siteId = this.devicesArray[j]?.site_id;
          const panelId = this.devicesArray[j]?.panel_id;
          const refNumber = this.devicesArray[j]?.reference_number;
          const panelLine = this.devicesArray[j]?.panel_line;
          const rftag = this.devicesArray[j]?.rftag;
          const addr = this.devicesArray[j]?.addr;
          const zone = this.devicesArray[j]?.zone;
          const deviceType = this.devicesArray[j]?.device_type;
          const deviceMessage = this.devicesArray[j]?.device_message;
          const cleaned = this.devicesArray[j]?.cleaned;
          const tested = this.devicesArray[j]?.tested;
          const correctMessage = this.devicesArray[j]?.correct_message;
          const newMessage = this.devicesArray[j]?.new_message;
          const dateCreated = this.devicesArray[j]?.date_created;
          const dateScanned = this.devicesArray[j]?.date_scanned;
          const na = this.devicesArray[j]?.na;
          console.log(deviceId + '--' + spId + '--' + refNumber);
          // eslint-disable-next-line max-len
          const updateDevices = [spId, techId, serviceTypeId, siteId, panelId, refNumber,panelLine,rftag, addr, zone,deviceType, deviceMessage, cleaned,tested,correctMessage,newMessage,na,dateScanned,dateCreated];
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET sp_id=?,tech_id=?, service_type_id=?, site_id=?, panel_id=?, reference_number=?, panel_line=?, rftag=?, addr=?, zone=?, device_type=?, device_message=?, cleaned=?, tested=?, correct_message=?, new_message=?, na=?, date_scanned=?, date_created=?  WHERE id = ${id}`, updateDevices)
          .then((update: any) => {
          console.log('Updated: ' + JSON.stringify(update));
          }, err => {
          console.log('Query Update error: ' + JSON.stringify(err));
          });
        } else {
          console.log('New Record');
          console.log(this.devicesArray[j]);
            if (Number(this.devicesArray[j]?.id)) {
              console.log('New Devices Added: ' + JSON.stringify(this.devicesArray[j]));
                const isSync = 'No';
                // eslint-disable-next-line max-len
                this.database.executeSql(`INSERT INTO fire_sp_template_device_loops_table (device_id, sp_id, tech_id, service_type_id, site_id, panel_id, reference_number, panel_line, rftag, addr, zone, device_type, device_message, cleaned, tested, correct_message, new_message, na, isSync, date_created ) VALUES ('${this.devicesArray[j]?.id}', '${this.devicesArray[j]?.sp_id}', '${this.devicesArray[j]?.tech_id}', '${this.devicesArray[j]?.service_type_id}', '${this.devicesArray[j]?.site_id}', '${this.devicesArray[j]?.panel_id}', '${this.devicesArray[j]?.reference_number}', '${this.devicesArray[j]?.panel_line}', '${this.devicesArray[j]?.rftag}', '${this.devicesArray[j]?.addr}','${this.devicesArray[j]?.zone}', '${this.devicesArray[j]?.device_type}', '${this.devicesArray[j]?.device_message}', '${this.devicesArray[j]?.cleaned}', '${this.devicesArray[j]?.tested}', '${this.devicesArray[j]?.correct_message}', '${this.devicesArray[j]?.new_message}', '${this.devicesArray[j]?.na}', '${isSync}', '${this.devicesArray[j]?.date_created}')`, [])
                .then((dRes: any) => {

                });
            }
        }
      });
    }
  }

}
