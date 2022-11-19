import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Component, OnInit } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { FormGroup } from '@angular/forms';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';

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
  ) {
    this.storage.get('currentUser').then((user: any) => {
      this.platform.ready().then(() => {
      OneSignal.getDeviceState((stateChanges: any) => {
        //console.log('Device State: ' + JSON.stringify(stateChanges));
        const userID = user?.id;
        const playerID = stateChanges.userId;
        const posttData = {
          userId: userID,
          playerId: playerID
        };
        console.log(posttData);
        this.http.post(this.url + 'update-onesignal-data.php', posttData).subscribe((res: any) => {
          // console.log(res);
        });
      });

    });

    });
   }

  ngOnInit() {

  }

  openSettings() {
    this.nativeSettings.open('airplane_mode').then((res: any) => {
      console.log('Output: ' + res);
    });
  }

  ionViewWillEnter(){
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
     }).then((db: SQLiteObject) => {
       this.database = db;
      //  this.dropTable();
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_template_device_loops_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id INTEGER,
        admin_id INTEGER,
        tech_id INTEGER,
        service_type_id INTEGER,
        site_id INTEGER,
        panel_id INTEGER,
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
          console.log('fire_template_device_loops_table table Created: ' + JSON.stringify(res));
        });

        this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_template_device_loops_table_device_knock (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          device_id INTEGER,
          admin_id INTEGER,
          tech_id INTEGER,
          service_type_id INTEGER,
          site_id INTEGER,
          panel_id INTEGER,
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
            console.log('fire_template_device_loops_table_device_knock table Created: ' + JSON.stringify(res));
          });

          this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_template_device_loops_table_sounder_knock (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id INTEGER,
            admin_id INTEGER,
            tech_id INTEGER,
            service_type_id INTEGER,
            site_id INTEGER,
            panel_id INTEGER,
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
              console.log('fire_template_device_loops_table_sounder_knock table Created: ' + JSON.stringify(res));
            });

            this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_template_device_loops_table_wireless (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              device_id INTEGER,
              admin_id INTEGER,
              tech_id INTEGER,
              service_type_id INTEGER,
              site_id INTEGER,
              panel_id INTEGER,
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
                console.log('fire_template_device_loops_table_wireless table Created: ' + JSON.stringify(res));
              });
     });
     this.loadDevices();
  }

  ionViewDidEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
  }

  dropTable() {
    this.database.executeSql(`DROP table fire_fault_reports `,[])
    .then((resAdd: any) => {
      console.log('TABLE fire_fault_reports DELETED: ' + JSON.stringify(resAdd));
    });
  }

  testWrite(){
    this.nfc.addNdefListener((res: any) => {
      console.log('Bevin: ' + res);
    }, (error) => {
      console.log(error);
    }).subscribe(() => {
      console.log('Ready for Writing');
      const message = this.ndef.textRecord('test');
      this.nfc.write([message]).then(success => {
        console.log('Writing Complete: ' + success);
        //this.nfcReadData();
      }).catch(error => {
          console.log(error);
        });
    });
    const msg = ['Test message device found'];
    this.nfc.share(msg).then((res: any) => {
      console.log(res);
    });
  }

  onNfc() {
    console.log('We here');
    const message = [this.ndef.textRecord('Hello Bevin', '101')];
    this.nfc.write(message).then((res: any) => {
      console.log('Wrote to tage');
      console.log(JSON.stringify(res));
    });
  }

  nfcReadData() {
    console.log('Reader Initializing');
    // eslint-disable-next-line no-bitwise
    this.flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode = this.nfc.readerMode(this.flags).subscribe((tag: any) => {
      console.log(JSON.stringify(tag));
      this.presentAlert(JSON.stringify(tag));
      console.log('received ndef message. the tag contains: ', tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(tag.id));
    }, err => {
      console.log(err);
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


  writeData() {
    this.platform.ready().then(() => {
      this.nfc.addNdefListener(() => {
        console.log('successfully attached ndef listener');
      }).subscribe((event) => {
        const message = [
          this.ndef.textRecord('hello, world'),
          this.ndef.uriRecord('http://github.com/chariotsolutions/phonegap-nfc')
          ];
          this.nfc.write(message).then((res: any) => {
            console.log(res);
          });
        });
      });
  }

  test2() {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
      // console.log(JSON.stringify(event));
      // this.msg = this.ndef.textRecord('Hello world');
      // this.nfc.share([this.msg]).then((res: any) => {
      //   console.log(res);
      //   console.log('Yes it runs');
      // }).catch((err: any) => {
      //   console.log(err);
      // });
    });
  }

  loadDevices() {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.http.get(this.url + 'get-service-cards-assigned-6.php?techID=' + user.id).subscribe((data: any) => {
        this.cards = data;
        console.log(this.cards);
        // eslint-disable-next-line guard-for-in, @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.cards.length; i++) {
          console.log(this.cards[i].service_type_id + '-----SITEID: ' + this.cards[i].site_id);
          // eslint-disable-next-line max-len
          this.http.get(this.url + 'get-devices-new.php?serviceTypeID=' + this.cards[i].service_type_id + '&siteID=' +  this.cards[i].site_id).subscribe((res: any) => {
            // console.log(res);
            this.devices = res.devices;
            this.deviceKnocks = res.deviceKnocks;
            this.sounderKnocks = res.sounderKnock;
            this.wireless = res.wireless;
            // console.log(res);
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let a = 0; a < this.devices.length; a++) {
              this.database.executeSql(`SELECT * FROM fire_template_device_loops_table WHERE device_id=?`,[this.devices[a].id])
              .then((resA: any) => {
                //console.log('Devices Found: ' + JSON.stringify(resD));
                if (resA.rows.length > 0) {
                  console.log('Update Devices Clean');
                } else {
                  console.log('New Record!!!');
                  const isSync = 'No';
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`INSERT INTO fire_template_device_loops_table (device_id, tech_id, service_type_id, site_id, panel_id, panel_line, rftag, addr, zone, device_type, device_message, cleaned, tested, correct_message, new_message, na, isSync, date_created ) VALUES ('${this.devices[a].id}', '${this.devices[a].tech_id}', '${this.devices[a].service_type_id}', '${this.devices[a].site_id}', '${this.devices[a].panel_id}', '${this.devices[a].panel_line}', '${this.devices[a].rftag}', '${this.devices[a].addr}','${this.devices[a].zone}', '${this.devices[a].device_type}', '${this.devices[a].device_message}', '${this.devices[a].cleaned}', '${this.devices[a].tested}', '${this.devices[a].correct_message}', '${this.devices[a].new_message}', '${this.devices[a].na}', '${isSync}', '${this.devices[a].date_created}')`, [])
                  .then((dRes: any) => {
                    console.log('Devices Added: ' + JSON.stringify(dRes));
                  });
                }
              });
            }
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let b = 0; b < this.deviceKnocks.length; b++) {
              // NUMBER 2
              // eslint-disable-next-line max-len
              this.database.executeSql(`SELECT * FROM fire_template_device_loops_table_device_knock WHERE device_id=?`,[this.deviceKnocks[b].id])
              .then((resB: any) => {
                console.log('Devices Found: ' + JSON.stringify(resB));
                if (resB.rows.length > 0) {
                  console.log('Update Single Device Knock');
                } else {
                  console.log('New Record!!!');
                  const isSync = 'No';
                  //Add
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`INSERT INTO fire_template_device_loops_table_device_knock (device_id, tech_id, service_type_id, site_id, panel_id, panel_line, rftag, addr, zone, device_type, device_message, cleaned, tested, correct_message, new_message, na, isSync, date_created ) VALUES ('${this.deviceKnocks[b].id}', '${this.deviceKnocks[b].tech_id}', '${this.deviceKnocks[b].service_type_id}', '${this.deviceKnocks[b].site_id}', '${this.deviceKnocks[b].panel_id}', '${this.deviceKnocks[b].panel_line}', '${this.deviceKnocks[b].rftag}', '${this.deviceKnocks[b].addr}','${this.deviceKnocks[b].zone}', '${this.deviceKnocks[b].device_type}', '${this.deviceKnocks[b].device_message}', '${this.deviceKnocks[b].cleaned}', '${this.deviceKnocks[b].tested}', '${this.deviceKnocks[b].correct_message}', '${this.deviceKnocks[b].new_message}', '${this.deviceKnocks[b].na}', '${isSync}', '${this.deviceKnocks[b].date_created}')`, [])
                  .then((dRes: any) => {
                    console.log('Single KnockDevices Added: ' + JSON.stringify(dRes));
                  });
                }
              });
            }
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let c = 0; c < this.sounderKnocks.length; c++) {
              // NUMBER 3
              // eslint-disable-next-line max-len
              this.database.executeSql(`SELECT * FROM fire_template_device_loops_table_sounder_knock WHERE device_id=?`,[this.sounderKnocks[c].id])
              .then((resC: any) => {
                //console.log('Devices Sounder Found: ' + JSON.stringify(resD));
                if (resC.rows.length > 0) {
                  console.log('Update Sounder Knock Devices');
                } else {
                  console.log('New Record!!!');
                  const isSync = 'No';
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`INSERT INTO fire_template_device_loops_table_sounder_knock (device_id, tech_id, service_type_id, site_id, panel_id, panel_line, rftag, addr, zone, device_type, device_message, cleaned, tested, correct_message, new_message, na, isSync, date_created ) VALUES ('${this.sounderKnocks[c].id}', '${this.sounderKnocks[c].tech_id}', '${this.sounderKnocks[c].service_type_id}', '${this.sounderKnocks[c].site_id}', '${this.sounderKnocks[c].panel_id}', '${this.sounderKnocks[c].panel_line}', '${this.sounderKnocks[c].rftag}', '${this.sounderKnocks[c].addr}','${this.sounderKnocks[c].zone}', '${this.sounderKnocks[c].device_type}', '${this.sounderKnocks[c].device_message}', '${this.sounderKnocks[c].cleaned}', '${this.sounderKnocks[c].tested}', '${this.sounderKnocks[c].correct_message}', '${this.sounderKnocks[c].new_message}', '${this.sounderKnocks[c].na}', '${isSync}', '${this.sounderKnocks[c].date_created}')`, [])
                  .then((dRes: any) => {
                    console.log('Devices Sounder Added: ' + JSON.stringify(dRes));
                  });
                }
              });
            }
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let w = 0; w < this.wireless.length; w++) {
              // NUMBER 4
              this.database.executeSql(`SELECT * FROM fire_template_device_loops_table_wireless WHERE device_id=?`,[this.wireless[w].id])
              .then((resW: any) => {
                //console.log('Devices Wireless Found: ' + JSON.stringify(resD));
                if (resW.rows.length > 0) {
                  console.log('Update Wireless Devices');
                } else {
                  console.log('New Record!!!');
                  const isSync = 'No';
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`INSERT INTO fire_template_device_loops_table_wireless (device_id, tech_id, service_type_id, site_id, panel_id, panel_line, rftag, addr, zone, device_type, device_message, cleaned, tested, correct_message, new_message, na, isSync, date_created ) VALUES ('${this.wireless[w].id}', '${this.wireless[w].tech_id}', '${this.wireless[w].service_type_id}', '${this.wireless[w].site_id}', '${this.wireless[w].panel_id}', '${this.wireless[w].panel_line}', '${this.wireless[w].rftag}', '${this.wireless[w].addr}','${this.wireless[w].zone}', '${this.wireless[w].device_type}', '${this.wireless[w].device_message}', '${this.wireless[w].cleaned}', '${this.wireless[w].tested}', '${this.wireless[w].correct_message}', '${this.wireless[w].new_message}', '${this.wireless[w].na}', '${isSync}', '${this.wireless[w].date_created}')`, [])
                  .then((dRes: any) => {
                    console.log('Devices Wireless Added: ' + JSON.stringify(dRes));
                  });
                }
              });
            }
          });
        }
      });
    });
  }

}
