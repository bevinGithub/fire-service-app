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
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
})
export class MonitoringPage implements OnInit {
  monitor: any = {};
  certID: any;
  cert: any;
  networkStatus: any;
  database: SQLiteObject;
  url = environment.url;
  escapeDoors: any;
  sprinklerSwitch: any;
  sprinklerPumpRoom: any;
  sumpPump: any;
  generatorSignals: any;
  other: any;
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
    this.monitor.date_created = moment().format('YYYY-MM-D H:mm:ss');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      //  this.dropTable();
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_monitoring  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        monitor_id INTEGER,
        service_type_id ENTEGER,
        site_id INTEGER,
        service_cert_id INTEGER,
        admin_id INTEGER,
        tech_id INTEGER,
        escape_doors TEXT,
        sprinkler_switch TEXT,
        sprinkler_pump_room TEXT,
        sump_pump TEXT,
        generator_signals TEXT,
        other TEXT,
        isSync VARCHAR(10),
        date_created TEXT)`, []).then((res: any) => {
          console.log('fire_monitoring table Created: ' + JSON.stringify(res));
        });
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
      const monitorSql = 'SELECT * FROM fire_monitoring WHERE service_cert_id=?';
      this.database.executeSql(monitorSql, [this.certID]).then((monitorR: any) => {
        console.log('Record Found: ' + JSON.stringify(monitorR));
        if (monitorR.rows.length > 0) {
          const monitor = monitorR.rows.item(0);
          console.log(monitor);
          this.monitor.escape_doors = monitor?.escape_doors;
          this.monitor.sprinkler_switch = monitor?.sprinkler_switch;
          this.monitor.sprinkler_pump_room = monitor?.sprinkler_pump_room;
          this.monitor.sump_pump = monitor?.sump_pump;
          this.monitor.generator_signals = monitor?.generator_signals;
          this.monitor.other = monitor?.other;
          this.monitor.tech_id = monitor?.tech_id;
          this.monitor.service_type_id = monitor?.service_type_id;
          this.monitor.service_cert_id = monitor?.service_cert_id;
          this.monitor.site_id = monitor?.site_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });

      const certSql = 'SELECT * FROM fire_service_certificates WHERE cert_id=?';
      this.database.executeSql(certSql, [this.certID]).then((logR: any) => {
        console.log('Record Found: ' + JSON.stringify(logR));
        if (logR.rows.length > 0) {
          const log = logR.rows.item(0);
          console.log(log);
          this.monitor.service_type_id = log?.service_type_id;
          this.monitor.site_id = log?.site_id;
          this.monitor.service_cert_id = log?.cert_id;
          this.monitor.tech_id = log?.service_technician_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
    } else { //Online

    }
  }

  submitMonitors() {
    console.log(this.monitor);
    this.certID = this.monitor.service_cert_id;
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      const scSql = 'SELECT * FROM fire_monitoring WHERE service_cert_id=?';
      this.database.executeSql(scSql, [this.certID]).then((monRes: any) => {
        console.log('BS RESULT: ' + JSON.stringify(monRes));
        if (monRes.rows.length > 0) {
          const mon = monRes.rows.item(0);
          if (this.monitor.escape_doors) {
            this.escapeDoors = this.monitor.escape_doors;
          } else {
            this.escapeDoors = '';
          }
          if (this.monitor.sprinkler_switch) {
            this.sprinklerSwitch = this.monitor.sprinkler_switch;
          } else {
            this.sprinklerSwitch = '';
          }
          if (this.monitor.sprinkler_pump_room) {
            this.sprinklerPumpRoom = this.monitor.sprinkler_pump_room;
          } else {
            this.sprinklerPumpRoom = '';
          }
          if (this.monitor.sump_pump) {
            this.sumpPump = this.monitor.sump_pump;
          } else {
            this.sumpPump = '';
          }
          if (this.monitor.generator_signals) {
            this.generatorSignals = this.monitor.generator_signals;
          } else {
            this.generatorSignals = '';
          }
          if (this.monitor.other) {
            this.other = this.monitor.other;
          } else {
            this.other = '';
          }
          // eslint-disable-next-line max-len
          const updateMonitor = [this.monitor.service_type_id,this.monitor.site_id,this.monitor.service_cert_id,this.monitor.tech_id,this.escapeDoors,this.sprinklerSwitch,this.sprinklerPumpRoom,this.sumpPump,this.generatorSignals,this.other];
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_monitoring SET service_type_id=?, site_id=?, service_cert_id=?, tech_id=?, escape_doors=?, sprinkler_switch=?, sprinkler_pump_room=?, sump_pump=?, generator_signals=?, other=? WHERE id=${mon.id}`, updateMonitor)
          .then((bs: any) => {
            console.log('fire_monitoring UPDATED: ' + JSON.stringify(bs));
            this.presentToast('Monitoring successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('fire_monitoring ERROR: ' + JSON.stringify(err));
            this.presentToast('Monitoring could not be saved!');
          });

        } else {
          const isSync = 'No';
          if (this.monitor.escape_doors) {
            this.escapeDoors = this.monitor.escape_doors;
          } else {
            this.escapeDoors = '';
          }
          if (this.monitor.sprinkler_switch) {
            this.sprinklerSwitch = this.monitor.sprinkler_switch;
          } else {
            this.sprinklerSwitch = '';
          }
          if (this.monitor.sprinkler_pump_room) {
            this.sprinklerPumpRoom = this.monitor.sprinkler_pump_room;
          } else {
            this.sprinklerPumpRoom = '';
          }
          if (this.monitor.sump_pump) {
            this.sumpPump = this.monitor.sump_pump;
          } else {
            this.sumpPump = '';
          }
          if (this.monitor.generator_signals) {
            this.generatorSignals = this.monitor.generator_signals;
          } else {
            this.generatorSignals = '';
          }
          if (this.monitor.other) {
            this.other = this.monitor.other;
          } else {
            this.other = '';
          }
          // eslint-disable-next-line max-len
          this.database.executeSql(`INSERT INTO fire_monitoring (service_type_id, site_id, service_cert_id, tech_id, escape_doors, sprinkler_switch, sprinkler_pump_room, sump_pump, generator_signals, other, isSync, date_created) VALUES ('${this.monitor.service_type_id}','${this.monitor.site_id}','${this.monitor.service_cert_id}','${this.monitor.tech_id}','${this.escapeDoors}','${this.sprinklerSwitch}','${this.sprinklerPumpRoom}','${this.sumpPump}','${this.generatorSignals}','${this.other}', '${isSync}','${this.monitor.date_created}')`, [])
          .then((bs: any) => {
            console.log('fire_monitoring ADDED: ' + JSON.stringify(bs));
            this.presentToast('Monitoring successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('fire_monitoring ERROR: ' + JSON.stringify(err));
            this.presentToast('Monitoring could not be saved!');
          });
        }
      });

    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  dropTable() {
    this.database.executeSql(`DROP table fire_monitoring `, [])
      .then((resAdd: any) => {
        console.log('TABLE fire_monitoring REMOVED: ' + JSON.stringify(resAdd));
      });
  }

}
