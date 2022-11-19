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
  selector: 'app-call-points',
  templateUrl: './call-points.page.html',
  styleUrls: ['./call-points.page.scss'],
})
export class CallPointsPage implements OnInit {
  callPoint: any = {};
  certID: any;
  cert;
  networkStatus: any;
  database: SQLiteObject;
  url = environment.url;
  callPointComments: any;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private sqlite: SQLite,
    private navController: NavController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private networkCheckerService: NetworkCheckerService,
  ) {
    this.callPoint.date_created = moment().format('YYYY-MM-D H:mm:ss');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
     }).then((db: SQLiteObject) => {
       this.database = db;
      //  this.dropTable();
      // eslint-disable-next-line max-len
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_manual_call_points  (id INTEGER PRIMARY KEY AUTOINCREMENT, call_id ENTEGER, service_type_id ENTEGER, site_id ENTEGER, service_cert_id ENTEGER, admin_id ENTEGER, tech_id ENTEGER, manual_call_point_comments TEXT, isSync TEXT, date_created TEXT)`,[])
      .then((res: any) => {
        console.log('CallPoint table Created: ' + JSON.stringify(res));
      });
     });
  }

  ngOnInit() {
    this.certID = `${this.cert}`;
    console.log('Cert Data' + this.certID);
    this.callPoint.service_cert_id = this.certID;
  }

  ionViewWillEnter(){
    this.certID = `${this.cert}`;
    console.log('Will Enter: ' + this.cert);
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      const certSql = 'SELECT * FROM fire_manual_call_points WHERE service_cert_id=?';
      this.database.executeSql(certSql, [this.certID]).then((logR: any) => {
        console.log('Record Found: ' + JSON.stringify(logR));
        if (logR.rows.length > 0) {
          const log = logR.rows.item(0);
          console.log(log);
          this.callPoint.manual_call_point_comments = log?.manual_call_point_comments;
          this.callPoint.tech_id = log?.tech_id;
          this.callPoint.service_type_id = log?.service_type_id;
          this.callPoint.service_cert_id = log?.service_cert_id;
          this.callPoint.site_id = log?.site_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
      const certSql2 = 'SELECT * FROM fire_service_certificates WHERE cert_id=?';
      this.database.executeSql(certSql2, [this.certID]).then((logR: any) => {
        console.log('Record Found: ' + JSON.stringify(logR));
        if (logR.rows.length > 0) {
          const log = logR.rows.item(0);
          console.log(log);
          this.callPoint.service_type_id = log?.service_type_id;
          this.callPoint.site_id = log?.site_id;
          this.callPoint.service_cert_id = log?.cert_id;
          this.callPoint.tech_id = log?.service_technician_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
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

  submitCallPoint() {
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      console.log(this.callPoint);
      const logSql = 'SELECT * FROM fire_manual_call_points WHERE service_cert_id=?';
      this.database.executeSql(logSql, [this.callPoint.service_cert_id]).then((logRes: any) => {
        console.log('RESULT FOUND: ' + JSON.stringify(logRes));
        if (logRes.rows.length > 0) {
          // UPDATE RECORD
          const data = logRes.rows.item(0);
          if (this.callPoint.manual_call_point_comments) {
            this.callPointComments = this.callPoint.manual_call_point_comments;
          } else {
            this.callPointComments = '';
          }
          // eslint-disable-next-line max-len
          const updateData = [this.callPoint.service_type_id, this.callPoint.site_id, this.callPoint.service_cert_id, this.callPoint.tech_id, this.callPointComments, this.callPoint.date_created];
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_manual_call_points SET service_type_id=?, site_id=?, service_cert_id=?, tech_id=?, manual_call_point_comments=?, date_created=? WHERE id=${data.id}`, updateData)
          .then((log: any) => {
            console.log('UPDATE DATA: ' + JSON.stringify(log));
            this.presentToast('Call point successfully saved!');
            this.modalController.dismiss();
          }, err => {
            this.presentToast('Call point could not be saved!');
          });
        } else {
          if (this.callPoint.manual_call_point_comments) {
            this.callPointComments = this.callPoint.manual_call_point_comments;
          } else {
            this.callPointComments = '';
          }
          // eslint-disable-next-line max-len
          this.database.executeSql(`INSERT INTO fire_manual_call_points (service_type_id, site_id, service_cert_id, tech_id, manual_call_point_comments, date_created) VALUES ('${this.callPoint.service_type_id}', '${this.callPoint.site_id}', '${this.callPoint.service_cert_id}', '${this.callPoint.tech_id}', '${this.callPointComments}', '${this.callPoint.date_created}')`,[])
          .then((log: any) => {
            console.log('ADD DATA: ' + JSON.stringify(log));
            this.presentToast('Call point successfully saved!');
            this.modalController.dismiss();
          }, err => {
            this.presentToast('Call point could not be saved!');
          });
        }
      });
    }
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  dropTable() {
    this.database.executeSql(`DROP table fire_callPoint `,[])
    .then((resAdd: any) => {
      console.log('Query Result: ' + JSON.stringify(resAdd));
    });
  }

}
