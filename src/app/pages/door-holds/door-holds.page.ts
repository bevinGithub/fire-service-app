import { ModalController, NavController, ToastController } from '@ionic/angular';
import { environment } from './../../../environments/environment';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import * as moment from 'moment';

@Component({
  selector: 'app-door-holds',
  templateUrl: './door-holds.page.html',
  styleUrls: ['./door-holds.page.scss'],
})
export class DoorHoldsPage implements OnInit {
  stairPressure: any = {};
  certID: any;
  cert: any;
  networkStatus: any;
  database: SQLiteObject;
  url = environment.url;
  location1: any;
  functional1: any;
  comment1: any;
  location2: any;
  functional2: any;
  comment2: any;
  location3: any;
  functional3: any;
  comment3: any;
  location4: any;
  functional4: any;
  comment4: any;
  location5: any;
  functional5: any;
  comment5: any;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private sqlite: SQLite,
    private navController: NavController,
    private toastController: ToastController,
    private modalController: ModalController,
    private networkCheckerService: NetworkCheckerService,
  ) {
    this.stairPressure.created_on = moment().format('YYYY-MM-D H:mm:ss');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      //  this.dropTable();
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_door_hold_devices  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stair_id INTEGER,
        sp_id INTEGER,
        service_type_id INTEGER,
        site_id INTEGER,
        service_cert_id INTEGER,
        admin_id INTEGER,
        tech_id INTEGER,
        location_1 TEXT,
        functional_1 TEXT,
        comment_1 TEXT,
        location_2 TEXT,
        functional_2 TEXT,
        comment_2 TEXT,
        location_3 TEXT,
        functional_3 TEXT,
        comment_3 TEXT,
        location_4 TEXT,
        functional_4 TEXT,
        comment_4 TEXT,
        location_5 TEXT,
        functional_5 TEXT,
        comment_5 TEXT,
        isSync VARCHAR(10),
        created_on TEXT)`, []).then((res: any) => {
          console.log('fire_door_hold_devices table Created: ' + JSON.stringify(res));
        });

        this.certID = this.cert;
        this.networkCheckerService.checkNetworkChange();
        this.networkStatus = this.networkCheckerService.connectionType();
        console.log('Connection Status: ' + this.networkStatus);
        console.log('ID' + this.certID);
        if (this.networkStatus === 'none') { //Offline
          const stairPressureSql = 'SELECT * FROM fire_door_hold_devices WHERE service_cert_id=?';
          this.database.executeSql(stairPressureSql, [this.certID]).then((stairPressureR: any) => {
            console.log('Record Found: ' + JSON.stringify(stairPressureR));
            if (stairPressureR.rows.length > 0) {
              const stairPressure = stairPressureR.rows.item(0);
              console.log(stairPressure);
              this.stairPressure.location_1 = stairPressure?.location_1;
              this.stairPressure.functional_1 = stairPressure?.functional_1;
              this.stairPressure.comment_1 = stairPressure?.comment_1;
              this.stairPressure.location_2 = stairPressure?.location_2;
              this.stairPressure.functional_2 = stairPressure?.functional_2;
              this.stairPressure.comment_2 = stairPressure?.comment_2;
              this.stairPressure.location_3 = stairPressure?.location_3;
              this.stairPressure.functional_3 = stairPressure?.functional_3;
              this.stairPressure.comment_3 = stairPressure?.comment_3;
              this.stairPressure.location_3 = stairPressure?.location_3;
              this.stairPressure.functional_3 = stairPressure?.functional_3;
              this.stairPressure.comment_3 = stairPressure?.comment_3;
              this.stairPressure.location_4 = stairPressure?.location_4;
              this.stairPressure.functional_4 = stairPressure?.functional_4;
              this.stairPressure.comment_4 = stairPressure?.comment_4;
              this.stairPressure.location_5 = stairPressure?.location_5;
              this.stairPressure.functional_5 = stairPressure?.functional_5;
              this.stairPressure.comment_5 = stairPressure?.comment_5;
              this.stairPressure.tech_id = stairPressure?.tech_id;
              this.stairPressure.service_type_id = stairPressure?.service_type_id;
              this.stairPressure.service_cert_id = stairPressure?.service_cert_id;
              this.stairPressure.site_id = stairPressure?.site_id;
            }
          }, err => {
            console.log('Cert error: ' + JSON.stringify(err));
          });
          const certSql = 'SELECT * FROM fire_sp_service_certificates WHERE cert_id=?';
          this.database.executeSql(certSql, [this.certID]).then((logR: any) => {
            console.log('Record Found: ' + JSON.stringify(logR));
            if (logR.rows.length > 0) {
              const log = logR.rows.item(0);
              console.log(log);
              this.stairPressure.service_type_id = log?.service_type_id;
              this.stairPressure.site_id = log?.site_id;
              this.stairPressure.service_cert_id = log?.cert_id;
              this.stairPressure.tech_id = log?.service_technician_id;
            }
          }, err => {
            console.log('Cert error: ' + JSON.stringify(err));
          });
        }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.certID = this.cert;
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    console.log('ID' + this.certID);
    if (this.networkStatus === 'none') { //Offline
      const stairPressureSql = 'SELECT * FROM fire_door_hold_devices WHERE service_cert_id=?';
      this.database.executeSql(stairPressureSql, [this.certID]).then((stairPressureR: any) => {
        console.log('Record Found: ' + JSON.stringify(stairPressureR));
        if (stairPressureR.rows.length > 0) {
          const stairPressure = stairPressureR.rows.item(0);
          console.log(stairPressure);
          this.stairPressure.location_1 = stairPressure?.location_1;
          this.stairPressure.functional_1 = stairPressure?.functional_1;
          this.stairPressure.comment_1 = stairPressure?.comment_1;
          this.stairPressure.location_2 = stairPressure?.location_2;
          this.stairPressure.functional_2 = stairPressure?.functional_2;
          this.stairPressure.comment_2 = stairPressure?.comment_2;
          this.stairPressure.location_3 = stairPressure?.location_3;
          this.stairPressure.functional_3 = stairPressure?.functional_3;
          this.stairPressure.comment_3 = stairPressure?.comment_3;
          this.stairPressure.location_3 = stairPressure?.location_3;
          this.stairPressure.functional_3 = stairPressure?.functional_3;
          this.stairPressure.comment_3 = stairPressure?.comment_3;
          this.stairPressure.location_4 = stairPressure?.location_4;
          this.stairPressure.functional_4 = stairPressure?.functional_4;
          this.stairPressure.comment_4 = stairPressure?.comment_4;
          this.stairPressure.location_5 = stairPressure?.location_5;
          this.stairPressure.functional_5 = stairPressure?.functional_5;
          this.stairPressure.comment_5 = stairPressure?.comment_5;
          this.stairPressure.tech_id = stairPressure?.tech_id;
          this.stairPressure.service_type_id = stairPressure?.service_type_id;
          this.stairPressure.service_cert_id = stairPressure?.service_cert_id;
          this.stairPressure.site_id = stairPressure?.site_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
      const certSql = 'SELECT * FROM fire_sp_service_certificates WHERE cert_id=?';
      this.database.executeSql(certSql, [this.certID]).then((logR: any) => {
        console.log('Record Found: ' + JSON.stringify(logR));
        if (logR.rows.length > 0) {
          const log = logR.rows.item(0);
          console.log(log);
          this.stairPressure.service_type_id = log?.service_type_id;
          this.stairPressure.site_id = log?.site_id;
          this.stairPressure.service_cert_id = log?.cert_id;
          this.stairPressure.tech_id = log?.service_technician_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
    } else { //Online

    }
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  submitstairPressures() {
    console.log(this.stairPressure);
    this.certID = this.stairPressure.service_cert_id;
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      const bsSql = 'SELECT * FROM fire_door_hold_devices WHERE service_cert_id=?';
      this.database.executeSql(bsSql, [this.certID]).then((bsRes: any) => {
        console.log('BS RESULT: ' + JSON.stringify(bsRes));
        if (bsRes.rows.length > 0) {
          const pressure = bsRes.rows.item(0);
          if (this.stairPressure.location_1) {
            this.location1 = this.stairPressure.location_1;
          } else {
            this.location1 = '';
          }
          if (this.stairPressure.functional_1) {
            this.functional1 = this.stairPressure.functional_1;
          } else {
            this.functional1 = '';
          }
          if (this.stairPressure.comment_1) {
            this.comment1 = this.stairPressure.comment_1;
          } else {
            this.comment1 = '';
          }
          if (this.stairPressure.location_2) {
            this.location2 = this.stairPressure.location_2;
          } else {
            this.location2 = '';
          }
          if (this.stairPressure.functional_2) {
            this.functional2 = this.stairPressure.functional_2;
          } else {
            this.functional2 = '';
          }
          if (this.stairPressure.comment_2) {
            this.comment2 = this.stairPressure.comment_2;
          } else {
            this.comment2 = '';
          }
          if (this.stairPressure.location_3) {
            this.location3 = this.stairPressure.location_3;
          } else {
            this.location3 = '';
          }
          if (this.stairPressure.functional_3) {
            this.functional3 = this.stairPressure.functional_3;
          } else {
            this.functional3 = '';
          }
          if (this.stairPressure.comment_3) {
            this.comment3 = this.stairPressure.comment_3;
          } else {
            this.comment3 = '';
          }
          if (this.stairPressure.location_4) {
            this.location4 = this.stairPressure.location_4;
          } else {
            this.location4 = '';
          }
          if (this.stairPressure.functional_4) {
            this.functional4 = this.stairPressure.functional_4;
          } else {
            this.functional4 = '';
          }
          if (this.stairPressure.comment_4) {
            this.comment4 = this.stairPressure.comment_4;
          } else {
            this.comment4 = '';
          }
          if (this.stairPressure.location_5) {
            this.location5 = this.stairPressure.location_5;
          } else {
            this.location5 = '';
          }
          if (this.stairPressure.functional_5) {
            this.functional5 = this.stairPressure.functional_5;
          } else {
            this.functional5 = '';
          }
          if (this.stairPressure.comment_5) {
            this.comment5 = this.stairPressure.comment_5;
          } else {
            this.comment5 = '';
          }
          // eslint-disable-next-line max-len
          const updateData = [this.stairPressure.service_type_id,this.stairPressure.site_id,this.stairPressure.service_cert_id,this.stairPressure.tech_id,this.location1,this.functional1,this.comment1,this.location2, this.functional2, this.comment2, this.location3, this.functional3, this.comment3, this.location4, this.functional4, this.comment4, this.location5, this.functional5, this.comment5];
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_door_hold_devices SET service_type_id=?, site_id=?, service_cert_id=?, tech_id=?, location_1=?, functional_1=?, comment_1=?, location_2=?, functional_2=?, comment_2=?, location_3=?, functional_3=?, comment_3=?, location_4=?, functional_4=?, comment_4=?, location_5=?, functional_5=?, comment_5=? WHERE id=${pressure.id}`, updateData)
          .then((bs: any) => {
            console.log('fire_door_hold_devices UPDATED: ' + JSON.stringify(bs));
            this.presentToast('Door hold devices successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('fire_door_hold_devices ERROR: ' + JSON.stringify(err));
            this.presentToast('Door hold devices could not be saved!');
          });

        } else {//Add New
          if (this.stairPressure.location_1) {
            this.location1 = this.stairPressure.location_1;
          } else {
            this.location1 = '';
          }
          if (this.stairPressure.functional_1) {
            this.functional1 = this.stairPressure.functional_1;
          } else {
            this.functional1 = '';
          }
          if (this.stairPressure.comment_1) {
            this.comment1 = this.stairPressure.comment_1;
          } else {
            this.comment1 = '';
          }
          if (this.stairPressure.location_2) {
            this.location2 = this.stairPressure.location_2;
          } else {
            this.location2 = '';
          }
          if (this.stairPressure.functional_2) {
            this.functional2 = this.stairPressure.functional_2;
          } else {
            this.functional2 = '';
          }
          if (this.stairPressure.comment_2) {
            this.comment2 = this.stairPressure.comment_2;
          } else {
            this.comment2 = '';
          }
          if (this.stairPressure.location_3) {
            this.location3 = this.stairPressure.location_3;
          } else {
            this.location3 = '';
          }
          if (this.stairPressure.functional_3) {
            this.functional3 = this.stairPressure.functional_3;
          } else {
            this.functional3 = '';
          }
          if (this.stairPressure.comment_3) {
            this.comment3 = this.stairPressure.comment_3;
          } else {
            this.comment3 = '';
          }
          if (this.stairPressure.location_4) {
            this.location4 = this.stairPressure.location_4;
          } else {
            this.location4 = '';
          }
          if (this.stairPressure.functional_4) {
            this.functional4 = this.stairPressure.functional_4;
          } else {
            this.functional4 = '';
          }
          if (this.stairPressure.comment_4) {
            this.comment4 = this.stairPressure.comment_4;
          } else {
            this.comment4 = '';
          }
          if (this.stairPressure.location_5) {
            this.location5 = this.stairPressure.location_5;
          } else {
            this.location5 = '';
          }
          if (this.stairPressure.functional_5) {
            this.functional5 = this.stairPressure.functional_5;
          } else {
            this.functional5 = '';
          }
          if (this.stairPressure.comment_5) {
            this.comment5 = this.stairPressure.comment_5;
          } else {
            this.comment5 = '';
          }
          const isSync = 'No';
          // eslint-disable-next-line max-len
          this.database.executeSql(`INSERT INTO fire_door_hold_devices (service_type_id, site_id, service_cert_id, tech_id, location_1, functional_1, comment_1, location_2, functional_2, comment_2, location_3, functional_3, comment_3, location_4, functional_4, comment_4, location_5, functional_5, comment_5, isSync, created_on) VALUES ('${this.stairPressure.service_type_id}','${this.stairPressure.site_id}','${this.stairPressure.service_cert_id}','${this.stairPressure.tech_id}','${this.location1}','${this.functional1}','${this.comment1}','${this.location2}', '${this.functional2}', '${this.comment2}', '${this.location3}', '${this.functional3}', '${this.comment3}', '${this.location4}', '${this.functional4}', '${this.comment4}', '${this.location5}', '${this.functional5}', '${this.comment5}', '${isSync}','${this.stairPressure.created_on}')`, [])
          .then((bs: any) => {
            console.log('fire_door_hold_devices ADDED: ' + JSON.stringify(bs));
            this.presentToast('Door hold devices successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('fire_door_hold_devices ERROR: ' + JSON.stringify(err));
            this.presentToast('Door hold device could not be saved!');
          });
        }

      });
    } else { // Online

    }
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  dropTable() {
    this.database.executeSql(`DROP table fire_door_hold_devices `, [])
      .then((resAdd: any) => {
        console.log('TABLE fire_door_hold_devices REMOVED: ' + JSON.stringify(resAdd));
      });
  }

}
