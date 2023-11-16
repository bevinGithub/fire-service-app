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
  selector: 'app-log-book',
  templateUrl: './log-book.page.html',
  styleUrls: ['./log-book.page.scss'],
})
export class LogBookPage implements OnInit {
  logBook: any = {};
  public certID: any;
  certData: any;
  networkStatus: any;
  database: SQLiteObject;
  url = environment.url;
  cert;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private sqlite: SQLite,
    private navController: NavController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private networkCheckerService: NetworkCheckerService,
    private modalController: ModalController
  ) {
    this.logBook.date_log = moment().format('YYYY-MM-D H:mm:ss'); //moment().format('YYYY-MM-D H:mm:ss');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      // eslint-disable-next-line max-len
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_logbook  (id INTEGER PRIMARY KEY AUTOINCREMENT, log_id INTEGER,sp_id INTEGER,  service_type_id INTEGER, site_id INTEGER, service_cert_id INTEGER, tech_id ENTERGER, admin_id INTEGER, log_comments TEXT, isSync TEXT, date_log TEXT)`, [])
      .then((res: any) => {
        console.log('LogBook table Created: ' + JSON.stringify(res));
      });

      this.certID = `${this.cert}`;
      this.logBook.service_cert_id = this.cert;
      console.log('Will Enter: ' + this.cert);
      this.networkCheckerService.checkNetworkChange();
      this.networkStatus = this.networkCheckerService.connectionType();
      console.log('Connection Status: ' + this.networkStatus);
      if (this.networkStatus === 'none') {
        const certSql = 'SELECT * FROM fire_logbook WHERE service_cert_id=?';
        this.database.executeSql(certSql, [this.certID]).then((logR: any) => {
          console.log('Record Found: ' + JSON.stringify(logR));
          if (logR.rows.length > 0) {
            const log = logR.rows.item(0);
            console.log(log);
            this.logBook.log_comments = log?.log_comments;
            this.logBook.tech_id = log?.tech_id;
            this.logBook.service_type_id = log?.service_type_id;
            this.logBook.service_cert_id = log?.service_cert_id;
            this.logBook.site_id = log?.site_id;
          } else {
            console.log('No records in logs');
          }
        }, err => {
          console.log('Cert error: ' + JSON.stringify(err));
        });
        const certSql2 = 'SELECT * FROM fire_sp_service_certificates WHERE cert_id=?';
        this.database.executeSql(certSql2, [this.certID]).then((logR: any) => {
          console.log('Record Found: ' + JSON.stringify(logR));
          if (logR.rows.length > 0) {
            const log = logR.rows.item(0);
            console.log(log);
            this.logBook.service_type_id = log?.service_type_id;
            this.logBook.site_id = log?.site_id;
            this.logBook.service_cert_id = log?.cert_id;
            this.logBook.tech_id = log?.service_technician_id;
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
    this.certID = `${this.cert}`;
    this.logBook.service_cert_id = this.cert;
    console.log('Will Enter: ' + this.cert);
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      const certSql = 'SELECT * FROM fire_logbook WHERE service_cert_id=?';
      this.database.executeSql(certSql, [this.certID]).then((logR: any) => {
        console.log('Record Found: ' + JSON.stringify(logR));
        if (logR.rows.length > 0) {
          const log = logR.rows.item(0);
          console.log(log);
          this.logBook.log_comments = log?.log_comments;
          this.logBook.tech_id = log?.tech_id;
          this.logBook.service_type_id = log?.service_type_id;
          this.logBook.service_cert_id = log?.service_cert_id;
          this.logBook.site_id = log?.site_id;
        } else {
          console.log('No records in logs');
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
      const certSql2 = 'SELECT * FROM fire_sp_service_certificates WHERE cert_id=?';
      this.database.executeSql(certSql2, [this.certID]).then((logR: any) => {
        console.log('Record Found: ' + JSON.stringify(logR));
        if (logR.rows.length > 0) {
          const log = logR.rows.item(0);
          console.log(log);
          this.logBook.service_type_id = log?.service_type_id;
          this.logBook.site_id = log?.site_id;
          this.logBook.service_cert_id = log?.cert_id;
          this.logBook.tech_id = log?.service_technician_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
    }
  }

  ionViewDidEnter(){

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  submitLogBook() {
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      console.log(this.logBook);
      const logSql = 'SELECT * FROM fire_logbook WHERE service_cert_id=?';
      this.database.executeSql(logSql, [this.logBook.service_cert_id]).then((logRes: any) => {
        console.log('RESULT FOUND: ' + JSON.stringify(logRes));
        if (logRes.rows.length > 0) {
          // UPDATE RECORD
          const data = logRes.rows.item(0);
          // eslint-disable-next-line max-len
          const updateData = [this.logBook?.service_type_id, this.logBook?.site_id, this.logBook?.service_cert_id, this.logBook?.tech_id, this.logBook?.log_comments];
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_logbook SET service_type_id=?, site_id=?, service_cert_id=?, tech_id=?, log_comments=? WHERE id=${data.id}`, updateData)
          .then((log: any) => {
            console.log('UPDATE DATA: ' + JSON.stringify(log));
            this.presentToast('Log book successfully saved!');
            this.modalController.dismiss();
          }, err => {
            this.presentToast('Log book could not be saved!');
          });
        } else {
          const isSync = 'No';
          // eslint-disable-next-line max-len
          this.database.executeSql(`INSERT INTO fire_logbook (service_type_id, site_id, service_cert_id, tech_id, log_comments,  isSync, date_log) VALUES ('${this.logBook?.service_type_id}', '${this.logBook?.site_id}', '${this.logBook?.service_cert_id}', '${this.logBook?.tech_id}', '${this.logBook?.log_comments}', '${isSync}', '${this.logBook?.date_log}')`,[])
          .then((log: any) => {
            console.log('Query Result: ' + JSON.stringify(log));
            this.presentToast('Log book successfully saved!');
            this.modalController.dismiss();
          }, err => {
            this.presentToast('Log book could not be saved!');
          });
        }
      });
    }
  }

  dropTable() {
    //DROP table fire_logbook
    this.database.executeSql(`DELETE FROM fire_logbook WHERE id=? `,[4])
    .then((resAdd: any) => {
      console.log('Query Result: ' + JSON.stringify(resAdd));
    });
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
