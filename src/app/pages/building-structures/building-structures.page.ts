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
  selector: 'app-building-structures',
  templateUrl: './building-structures.page.html',
  styleUrls: ['./building-structures.page.scss'],
})
export class BuildingStructuresPage implements OnInit {
  building: any = {};
  certID: any;
  cert: any;
  networkStatus: any;
  database: SQLiteObject;
  url = environment.url;
  struct1: any;
  struct2: any;
  struct3: any;
  struct4: any;
  struct5: any;
  struct6: any;
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
    this.building.structure_created = moment().format('YYYY-MM-D H:mm:ss');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      //  this.dropTable();
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_building_structures  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        building_id ENTEGER,
        service_type_id ENTEGER,
        site_id ENTEGER,
        service_cert_id ENTEGER,
        admin_id ENTEGER,
        tech_id ENTEGER,
        structure_one TEXT,
        structure_two TEXT,
        structure_three TEXT,
        structure_four TEXT,
        structure_five TEXT,
        structure_six TEXT,
        structure_created TEXT)`, []).then((res: any) => {
          console.log('BUILDING STRUCTURE table Created: ' + JSON.stringify(res));
        });
    });
  }

  ngOnInit() {
    this.certID = `${this.cert}`;
    console.log('Cert Data' + this.certID );
    this.building.service_cert_id = this.certID;
  }

  ionViewWillEnter(){
    this.certID = `${this.cert}`;
    console.log('Will Enter' + this.certID );
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    console.log('ID' + this.certID);
    if (this.networkStatus === 'none') {
      const buildSql = 'SELECT * FROM fire_building_structures WHERE service_cert_id=?';
      this.database.executeSql(buildSql, [this.certID]).then((logR: any) => {
        console.log('Record Found: ' + JSON.stringify(logR));
        if (logR.rows.length > 0) {
          const log = logR.rows.item(0);
          console.log(log);
          this.building.structure_one = log?.structure_one;
          this.building.structure_two = log?.structure_two;
          this.building.structure_three = log?.structure_three;
          this.building.structure_four = log?.structure_four;
          this.building.structure_five = log?.structure_five;
          this.building.structure_six = log?.structure_six;
          this.building.tech_id = log?.tech_id;
          this.building.service_type_id = log?.service_type_id;
          this.building.service_cert_id = log?.service_cert_id;
          this.building.site_id = log?.site_id;
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
          this.building.service_type_id = log?.service_type_id;
          this.building.site_id = log?.site_id;
          this.building.service_cert_id = log?.cert_id;
          this.building.tech_id = log?.service_technician_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
    }
  }

  submitStructures() {
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      console.log(this.building);
      const bsSql = 'SELECT * FROM fire_building_structures WHERE service_cert_id=?';
      this.database.executeSql(bsSql, [this.building.service_cert_id]).then((bsRes: any) => {
        console.log('BS RESULT: ' + JSON.stringify(bsRes));
        if (bsRes.rows.length > 0) {
          console.log('Update Record: ');
          const bs = bsRes.rows.item(0);
          console.log('BS RECORD: ' + JSON.stringify(bs));
          if (this.building.structure_one) {
            this.struct1 = this.building.structure_one;
          } else {
            this.struct1 = '';
          }
          if (this.building.structure_two) {
            this.struct2 = this.building.structure_two;
          } else {
            this.struct2 = '';
          }
          if (this.building.structure_three) {
            this.struct3 = this.building.structure_three;
          } else {
            this.struct3 = '';
          }
          if (this.building.structure_four) {
            this.struct4 = this.building.structure_four;
          } else {
            this.struct4 = '';
          }
          if (this.building.structure_five) {
            this.struct5 = this.building.structure_five;
          } else {
            this.struct5 = '';
          }
          if (this.building.structure_six) {
            this.struct6 = this.building.structure_six;
          } else {
            this.struct6 = '';
          }
          // eslint-disable-next-line max-len
          const bsUpdateData =  [this.building.service_type_id,this.building.site_id,this.building.service_cert_id,this.building.tech_id,this.struct1,this.struct2,this.struct3,this.struct4,this.struct5,this.struct6];
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_building_structures SET service_type_id=?,site_id=?,service_cert_id=?,tech_id=?,structure_one=?,structure_two=?,structure_three=?,structure_four=?,structure_five=?,structure_six=? WHERE id=${bs.id}`, bsUpdateData)
          .then((bsUpdate: any) => {
            console.log('BS UPDATED: ' + JSON.stringify(bsUpdate));
            this.presentToast('Building structure successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('BS UPDATE ERROR: ' + JSON.stringify(err));
            this.presentToast('Building structure could not be saved!');
          });
        } else {
          // New Record
          if (this.building.structure_one) {
            this.struct1 = this.building.structure_one;
          } else {
            this.struct1 = '';
          }
          if (this.building.structure_two) {
            this.struct2 = this.building.structure_two;
          } else {
            this.struct2 = '';
          }
          if (this.building.structure_three) {
            this.struct3 = this.building.structure_three;
          } else {
            this.struct3 = '';
          }
          if (this.building.structure_four) {
            this.struct4 = this.building.structure_four;
          } else {
            this.struct4 = '';
          }
          if (this.building.structure_five) {
            this.struct5 = this.building.structure_five;
          } else {
            this.struct5 = '';
          }
          if (this.building.structure_six) {
            this.struct6 = this.building.structure_six;
          } else {
            this.struct6 = '';
          }
          const isSync = 'No';
          // eslint-disable-next-line max-len
          this.database.executeSql(`INSERT INTO fire_building_structures (service_type_id,site_id,service_cert_id,tech_id,structure_one,structure_two,structure_three,structure_four,structure_five,structure_six, structure_created) VALUES ('${this.building.service_type_id}','${this.building.site_id}','${this.building.service_cert_id}','${this.building.tech_id}','${this.struct1}','${this.struct2}','${this.struct3}','${this.struct4}','${this.struct5}','${this.struct6}', '${this.building.structure_created}')`, [])
          .then((bs: any) => {
            console.log('BS ADDED: ' + JSON.stringify(bs));
            this.presentToast('Building structure successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('BS ADDING ERROR: ' + JSON.stringify(err));
            this.presentToast('Building structure could not be saved!');
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
    this.database.executeSql(`DROP table fire_building_structures `, [])
      .then((resAdd: any) => {
        console.log('TABLE STRUCTURES REMOVED: ' + JSON.stringify(resAdd));
      });
  }

}
