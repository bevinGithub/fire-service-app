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
  selector: 'app-beam-detection',
  templateUrl: './beam-detection.page.html',
  styleUrls: ['./beam-detection.page.scss'],
})
export class BeamDetectionPage implements OnInit {
  beam: any = {};
  certID: any;
  cert: any;
  networkStatus: any;
  database: SQLiteObject;
  url = environment.url;
  units: any;
  typeMake: any;
  beamsTested: any;
  comments: any;
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
    this.beam.detection_created = moment().format('YYYY-MM-D H:mm:ss');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      //  this.dropTable();
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_beam_detection_template  (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        beam_id INTEGER,
        service_type_id ENTEGER,
        site_id INTEGER,
        service_cert_id INTEGER,
        admin_id INTEGER,
        tech_id INTEGER,
        type_make VARCHAR(60),
        units VARCHAR(60),
        beams_tested VARCHAR(60),
        comment TEXT,
        isSync VARCHAR(10),
        detection_created TEXT)`, []).then((res: any) => {
          console.log('BEAM DETECTION table Created: ' + JSON.stringify(res));
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
    console.log('Service CertID' + this.certID);
    if (this.networkStatus === 'none') { //Offline
      const beamSql = 'SELECT * FROM fire_beam_detection_template WHERE service_cert_id=?';
      this.database.executeSql(beamSql, [this.certID]).then((beamR: any) => {
        console.log('Record Found: ' + JSON.stringify(beamR));
        if (beamR.rows.length > 0) {
          const beam = beamR.rows.item(0);
          console.log(beam);
          this.beam.type_make = beam?.type_make;
          this.beam.units = beam?.units;
          this.beam.beams_tested = beam?.beams_tested;
          this.beam.comment = beam?.comment;
          this.beam.tech_id = beam?.tech_id;
          this.beam.service_type_id = beam?.service_type_id;
          this.beam.service_cert_id = beam?.service_cert_id;
          this.beam.site_id = beam?.site_id;
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
          this.beam.service_type_id = log?.service_type_id;
          this.beam.site_id = log?.site_id;
          this.beam.service_cert_id = log?.cert_id;
          this.beam.tech_id = log?.service_technician_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
    } else { //Online Here

    }
  }

  submitBeams() {
    console.log(this.beam);
    this.certID = this.beam.service_cert_id;
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      const bsSql = 'SELECT * FROM fire_beam_detection_template WHERE service_cert_id=?';
      this.database.executeSql(bsSql, [this.certID]).then((bsRes: any) => {
        console.log('BS RESULT: ' + JSON.stringify(bsRes));
        if (bsRes.rows.length > 0) {
          console.log('Record Available');
          const beam = bsRes.rows.item(0);
          if (this.beam.type_make) {
            this.typeMake = this.beam.type_make;
          } else {
            this.typeMake = '';
          }
          if (this.beam.units) {
            this.units = this.beam.units;
          } else {
            this.units = '';
          }
          if (this.beam.beams_tested) {
            this.beamsTested = this.beam.beams_tested;
          } else {
            this.beamsTested = '';
          }
          if (this.beam.comment) {
            this.comments = this.beam.comment;
          } else {
            this.comments = '';
          }
          // eslint-disable-next-line max-len
          const updateBeam = [this.beam.service_type_id,this.beam.site_id,this.beam.service_cert_id,this.beam.tech_id,this.typeMake,this.units,this.beamsTested,this.comments];
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_beam_detection_template SET service_type_id=?, site_id=?, service_cert_id=?, tech_id=?, type_make=?, units=?, beams_tested=?, comment=? WHERE id=${beam.id}`, updateBeam)
          .then((bs: any) => {
            console.log('BEAM UPDATED: ' + JSON.stringify(bs));
            this.presentToast('BEAM detection successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('BEAM UPDATE ERROR: ' + JSON.stringify(err));
            this.presentToast('BEAM detection could not be saved!');
          });
        } else {
          if (this.beam.type_make) {
            this.typeMake = this.beam.type_make;
          } else {
            this.typeMake = '';
          }
          if (this.beam.units) {
            this.units = this.beam.units;
          } else {
            this.units = '';
          }
          if (this.beam.beams_tested) {
            this.beamsTested = this.beam.beams_tested;
          } else {
            this.beamsTested = '';
          }
          if (this.beam.comment) {
            this.comments = this.beam.comment;
          } else {
            this.comments = '';
          }
          const isSync = 'No';
          // eslint-disable-next-line max-len
          this.database.executeSql(`INSERT INTO fire_beam_detection_template (service_type_id, site_id, service_cert_id, tech_id, type_make, units, beams_tested, comment, isSync, detection_created) VALUES ('${this.beam.service_type_id}','${this.beam.site_id}','${this.beam.service_cert_id}','${this.beam.tech_id}','${this.typeMake}','${this.units}','${this.beamsTested}','${this.comments}', '${isSync}','${this.beam.detection_created}')`, [])
          .then((bs: any) => {
            console.log('BEAM ADDED: ' + JSON.stringify(bs));
            this.presentToast('Beam detection successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('BEAM ADDING ERROR: ' + JSON.stringify(err));
            this.presentToast('Beam detection could not be saved!');
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
    this.database.executeSql(`DROP table fire_beam_detection_template `, [])
      .then((resAdd: any) => {
        console.log('TABLE STRUCTURES REMOVED: ' + JSON.stringify(resAdd));
      });
  }

}
