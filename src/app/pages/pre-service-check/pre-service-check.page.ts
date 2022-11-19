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
  selector: 'app-pre-service-check',
  templateUrl: './pre-service-check.page.html',
  styleUrls: ['./pre-service-check.page.scss'],
})
export class PreServiceCheckPage implements OnInit {
  tests: any = {};
  certID: any;
  cert: any;
  panel: any;
  networkStatus: any;
  database: SQLiteObject;
  url = environment.url;

  controlTests1: any;
  controlTestComment1: any;
  commTests2: any;
  commTestsComment2: any;
  batteryTests3: any;
  batteryTerminals3: any;
  batteryVoltageUnderLoad3: any;
  batteryVoltageNoLoad3: any;
  chargeVoltageBatteryConnected3: any;
  batteryTestsComment3: any;
  cableTermination4: any;
  feedBridged4: any;
  cableEarthed4: any;
  loopChecked4: any;
  cableFr204: any;
  cableFr304: any;
  loopConfigureClass4: any;
  loopVoltage4: any;
  loop1Comment4: any;
  cableTermination5: any;
  feedBridged5: any;
  cableEarthed5: any;
  loopChecked5: any;
  cableFr205: any;
  cableFr305: any;
  loopConfigureClass5: any;
  loopVoltage5: any;
  loop1Comment5: any;
  cableTermination6: any;
  feedBridged6: any;
  cableEarthed6: any;
  loopChecked6: any;
  cableFr206: any;
  cableFr306: any;
  loopConfigureClass6: any;
  loopVoltage6: any;
  loop1Comment6: any;
  cableTermination7: any;
  feedBridged7: any;
  cableEarthed7: any;
  loopChecked7: any;
  cableFr207: any;
  cableFr307: any;
  loopConfigureClass7: any;
  loopVoltage7: any;
  loop1Comment7: any;
  panelID: any;
  loop1: any;
  loop2: any;
  loop3: any;
  loop4: any;
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
    //his.certID = this.activatedRoute.snapshot.paramMap.get('certID');
    //this.panelID = this.activatedRoute.snapshot.paramMap.get('panelID');
    this.tests.panel_date = moment().format('YYYY-MM-D H:mm:ss');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      //  this.dropTable();
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_template_panels_post_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        testing_id INTEGER,
        service_cert_id INTEGER,
        service_type_id INTEGER,
        site_id INTEGER,
        admin_id INTEGER,
        tech_id INTEGER,
        panel_id INTEGER,
        control_tests_1 TEXT,
        control_test_comment_1 TEXT,
        comm_tests_2  TEXT,
        comm_tests_comment_2 TEXT,
        battery_tests_3 TEXT,
        battery_terminals_3 TEXT,
        battery_voltage_under_load_3 TEXT,
        battery_voltage_no_load_3 TEXT,
        charge_voltage_battery_connected_3 TEXT,
        battery_tests_comment_3 TEXT,
        cable_termination_4 TEXT,
        feed_bridged_4 TEXT,
        cable_earthed_4 TEXT,
        loop_checked_4 TEXT,
        cable_fr20_4 TEXT,
        cable_fr30_4 TEXT,
        loop_configure_class_4 TEXT,
        loop_voltage_4 TEXT,
        loop_1_comment_4 TEXT,
        cable_termination_5 TEXT,
        feed_bridged_5 TEXT,
        cable_earthed_5 TEXT,
        loop_checked_5 TEXT,
        cable_fr20_5 TEXT,
        cable_fr30_5 TEXT,
        loop_configure_class_5 TEXT,
        loop_voltage_5 TEXT,
        loop_1_comment_5 TEXT,
        cable_termination_6 TEXT,
        feed_bridged_6 TEXT,
        cable_earthed_6 TEXT,
        loop_checked_6 TEXT,
        cable_fr20_6 TEXT,
        cable_fr30_6 TEXT,
        loop_configure_class_6 TEXT,
        loop_voltage_6 TEXT,
        loop_1_comment_6 TEXT,
        cable_termination_7 TEXT,
        feed_bridged_7 TEXT,
        cable_earthed_7 TEXT,
        loop_checked_7 TEXT,
        cable_fr20_7 TEXT,
        cable_fr30_7 TEXT,
        loop_configure_class_7 TEXT,
        loop_voltage_7 TEXT,
        loop_1_comment_7 TEXT,
        isSync VARCHAR(10),
        panel_date TEXT)`, []).then((res: any) => {
          console.log('fire_template_panels_post_data table Created: ' + JSON.stringify(res));
        });
    });
  }

  ngOnInit() {
    this.certID = this.cert;
    this.panelID = this.panel;
    console.log('Cert Data' + this.certID);
    console.log('Panel Data' + this.panelID);
    this.tests.service_cert_id = this.certID;
  }

  ionViewWillEnter(){
    this.certID = this.cert;
    this.panelID = this.panel;
    console.log('Will Enter: ' + this.certID);
    console.log('Will Enter Panel: ' + this.panel);
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    this.tests.panel_id = this.panel;
    this.tests.service_cert_id = this.certID;
    if (this.networkStatus === 'none') { //Offline
      const serviceCheckSql = 'SELECT * FROM fire_template_panels_post_data WHERE service_cert_id=?';
      this.database.executeSql(serviceCheckSql, [this.certID]).then((serviceCheck: any) => {
        if (serviceCheck.rows.length > 0) {
          console.log('Record Found: ' + JSON.stringify(serviceCheck.rows.item(0)));
          const serviceCheckR = serviceCheck.rows.item(0);
          this.tests.control_tests_1 = serviceCheckR?.control_tests_1;
          this.tests.control_test_comment_1 = serviceCheckR?.control_test_comment_1;

          this.tests.comm_tests_2 = serviceCheckR?.comm_tests_2;
          this.tests.comm_tests_comment_2 = serviceCheckR?.comm_tests_comment_2;

          this.tests.battery_tests_3 = serviceCheckR?.battery_tests_3;
          this.tests.battery_terminals_3 = serviceCheckR?.battery_terminals_3;
          this.tests.battery_voltage_under_load_3 = serviceCheckR?.battery_voltage_under_load_3;
          this.tests.battery_voltage_no_load_3 = serviceCheckR?.battery_voltage_no_load_3;
          this.tests.charge_voltage_battery_connected_3 = serviceCheckR?.charge_voltage_battery_connected_3;
          this.tests.battery_tests_comment_3 = serviceCheckR?.battery_tests_comment_3;

          this.tests.cable_termination_4 = serviceCheckR?.cable_termination_4;
          this.tests.feed_bridged_4 = serviceCheckR?.feed_bridged_4;
          this.tests.cable_earthed_4 = serviceCheckR?.cable_earthed_4;
          this.tests.loop_checked_4 = serviceCheckR?.loop_checked_4;
          this.tests.cable_fr20_4 = serviceCheckR?.cable_fr20_4;
          this.tests.cable_fr30_4 = serviceCheckR?.cable_fr30_4;
          this.tests.loop_configure_class_4 = serviceCheckR?.loop_configure_class_4;
          this.tests.loop_voltage_4 = serviceCheckR?.loop_voltage_4;
          this.tests.loop_1_comment_4 = serviceCheckR?.loop_1_comment_4;

          this.tests.cable_termination_5 = serviceCheckR?.cable_termination_5;
          this.tests.feed_bridged_5 = serviceCheckR?.feed_bridged_5;
          this.tests.cable_earthed_5 = serviceCheckR?.cable_earthed_5;
          this.tests.loop_checked_5 = serviceCheckR?.loop_checked_5;
          this.tests.cable_fr20_5 = serviceCheckR?.cable_fr20_5;
          this.tests.cable_fr30_5 = serviceCheckR?.cable_fr30_5;
          this.tests.loop_configure_class_5 = serviceCheckR?.loop_configure_class_5;
          this.tests.loop_voltage_5 = serviceCheckR?.loop_voltage_5;
          this.tests.loop_1_comment_5 = serviceCheckR?.loop_1_comment_5;

          this.tests.cable_termination_6 = serviceCheckR?.cable_termination_6;
          this.tests.feed_bridged_6 = serviceCheckR?.feed_bridged_6;
          this.tests.cable_earthed_6 = serviceCheckR?.cable_earthed_6;
          this.tests.loop_checked_6 = serviceCheckR?.loop_checked_6;
          this.tests.cable_fr20_6 = serviceCheckR?.cable_fr20_6;
          this.tests.cable_fr30_6 = serviceCheckR?.cable_fr30_6;
          this.tests.loop_configure_class_6 = serviceCheckR?.loop_configure_class_6;
          this.tests.loop_voltage_6 = serviceCheckR?.loop_voltage_6;
          this.tests.loop_1_comment_6 = serviceCheckR?.loop_1_comment_6;

          this.tests.cable_termination_7 = serviceCheckR?.cable_termination_7;
          this.tests.feed_bridged_7 = serviceCheckR?.feed_bridged_7;
          this.tests.cable_earthed_7 = serviceCheckR?.cable_earthed_7;
          this.tests.loop_checked_7 = serviceCheckR?.loop_checked_7;
          this.tests.cable_fr20_7 = serviceCheckR?.cable_fr20_7;
          this.tests.cable_fr30_7 = serviceCheckR?.cable_fr30_7;
          this.tests.loop_configure_class_7 = serviceCheckR?.loop_configure_class_7;
          this.tests.loop_voltage_7 = serviceCheckR?.loop_voltage_7;
          this.tests.loop_1_comment_7 = serviceCheckR?.loop_1_comment_7;
          // this.tests.panel_id = this.panel;
          this.tests.service_cert_id = this.certID;
        }
      }, err => {
        console.log(err);
      });

      const certSql = 'SELECT * FROM fire_service_certificates WHERE cert_id=?';
      this.database.executeSql(certSql, [this.certID]).then((logR: any) => {
        console.log('Record Found: ' + JSON.stringify(logR));
        if (logR.rows.length > 0) {
          const log = logR.rows.item(0);
          console.log(log);
          this.tests.service_type_id = log?.service_type_id;
          this.tests.site_id = log?.site_id;
          this.tests.service_cert_id = log?.cert_id;
          this.tests.tech_id = log?.service_technician_id;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });

      const sqlPQeury = 'SELECT * FROM fire_template_panels WHERE id=?';
      this.database.executeSql(sqlPQeury, [this.panelID]).then((logP: any) => {
        console.log('Record Found: ' + JSON.stringify(logP));
        if (logP.rows.length > 0) {
          const panel = logP.rows.item(0);
          console.log(panel);
          this.loop1 = panel.loop_1;
          this.loop2 = panel.loop_2;
          this.loop3 = panel.loop_3;
          this.loop4 = panel.loop_4;
        }
      }, err => {
        console.log('Cert error: ' + JSON.stringify(err));
      });
    } else { //Online

    }
  }

  submitServiceCheck() {
    console.log(this.tests);
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.certID = this.tests.service_cert_id;
      const bsSql = 'SELECT * FROM fire_template_panels_post_data WHERE service_cert_id=?';
      this.database.executeSql(bsSql, [this.certID]).then((bsRes: any) => {
        console.log('BS RESULT: ' + JSON.stringify(bsRes));
        if (bsRes.rows.length > 0) {
          const panelData = bsRes.rows.item(0);
          if (this.tests.control_tests_1) {
            this.controlTests1 = this.tests.control_tests_1;
          } else {
            this.controlTests1 = '';
          }
          if (this.tests.control_test_comment_1) {
            this.controlTestComment1 = this.tests.control_test_comment_1;
          } else {
            this.controlTestComment1 = '';
          }
          if (this.tests.comm_tests_2) {
            this.commTests2 = this.tests.comm_tests_2;
          } else {
            this.commTests2 = '';
          }
          if (this.tests.comm_tests_comment_2) {
            this.commTestsComment2 = this.tests.comm_tests_comment_2;
          } else {
            this.commTestsComment2 = '';
          }
          if (this.tests.battery_tests_3) {
            this.batteryTests3 = this.tests.battery_tests_3;
          } else {
            this.batteryTests3 = '';
          }
          if (this.tests.battery_terminals_3) {
            this.batteryTerminals3 = this.tests.battery_terminals_3;
          } else {
            this.batteryTerminals3 = '';
          }
          if (this.tests.battery_voltage_under_load_3) {
            this.batteryVoltageUnderLoad3 = this.tests.battery_voltage_under_load_3;
          } else {
            this.batteryVoltageUnderLoad3 = '';
          }
          if (this.tests.battery_voltage_no_load_3) {
            this.batteryVoltageNoLoad3 = this.tests.battery_voltage_no_load_3;
          } else {
            this.batteryVoltageNoLoad3 = '';
          }
          if (this.tests.charge_voltage_battery_connected_3) {
            this.chargeVoltageBatteryConnected3 = this.tests.charge_voltage_battery_connected_3;
          } else {
            this.chargeVoltageBatteryConnected3 = '';
          }
          if (this.tests.battery_tests_comment_3) {
            this.batteryTestsComment3 = this.tests.battery_tests_comment_3;
          } else {
            this.batteryTestsComment3 = '';
          }
          // LOOP 1
          if (this.tests.cable_termination_4) {
            this.cableTermination4 = this.tests.cable_termination_4;
          } else {
            this.cableTermination4 = '';
          }

          if (this.tests.feed_bridged_4) {
            this.feedBridged4 = this.tests.feed_bridged_4;
          } else {
            this.feedBridged4 = '';
          }
          if (this.tests.cable_earthed_4) {
            this.cableEarthed4 = this.tests.cable_earthed_4;
          } else {
            this.cableEarthed4 = '';
          }
          if (this.tests.loop_checked_4) {
            this.loopChecked4 = this.tests.loop_checked_4;
          } else {
            this.loopChecked4 = '';
          }
          if (this.tests.cable_fr20_4) {
            this.cableFr204 = this.tests.cable_fr20_4;
          } else {
            this.cableFr204 = '';
          }
          if (this.tests.cable_fr30_4) {
            this.cableFr304 = this.tests.cable_fr30_4;
          } else {
            this.cableFr304 = '';
          }
          if (this.tests.loop_configure_class_4) {
            this.loopConfigureClass4 = this.tests.loop_configure_class_4;
          } else {
            this.loopConfigureClass4 = '';
          }
          if (this.tests.loop_voltage_4) {
            this.loopVoltage4 = this.tests.loop_voltage_4;
          } else {
            this.loopVoltage4 = '';
          }
          if (this.tests.loop_1_comment_4) {
            this.loop1Comment4 = this.tests.loop_1_comment_4;
          } else {
            this.loop1Comment4 = '';
          }
          // LOOP 2
          if (this.tests.cable_termination_5) {
            this.cableTermination5 = this.tests.cable_termination_5;
          } else {
            this.cableTermination5 = '';
          }

          if (this.tests.feed_bridged_5) {
            this.feedBridged5 = this.tests.feed_bridged_5;
          } else {
            this.feedBridged5 = '';
          }
          if (this.tests.cable_earthed_5) {
            this.cableEarthed5 = this.tests.cable_earthed_5;
          } else {
            this.cableEarthed5 = '';
          }
          if (this.tests.loop_checked_5) {
            this.loopChecked5 = this.tests.loop_checked_5;
          } else {
            this.loopChecked5 = '';
          }
          if (this.tests.cable_fr20_5) {
            this.cableFr205 = this.tests.cable_fr20_5;
          } else {
            this.cableFr205 = '';
          }
          if (this.tests.cable_fr30_5) {
            this.cableFr305 = this.tests.cable_fr30_5;
          } else {
            this.cableFr305 = '';
          }
          if (this.tests.loop_configure_class_5) {
            this.loopConfigureClass5 = this.tests.loop_configure_class_5;
          } else {
            this.loopConfigureClass5 = '';
          }
          if (this.tests.loop_voltage_5) {
            this.loopVoltage5 = this.tests.loop_voltage_5;
          } else {
            this.loopVoltage5 = '';
          }
          if (this.tests.loop_1_comment_5) {
            this.loop1Comment5 = this.tests.loop_1_comment_5;
          } else {
            this.loop1Comment5 = '';
          }
          // LOOP 3
          if (this.tests.cable_termination_6) {
            this.cableTermination6 = this.tests.cable_termination_6;
          } else {
            this.cableTermination6 = '';
          }
          if (this.tests.feed_bridged_6) {
            this.feedBridged6 = this.tests.feed_bridged_6;
          } else {
            this.feedBridged6 = '';
          }
          if (this.tests.cable_earthed_6) {
            this.cableEarthed6 = this.tests.cable_earthed_6;
          } else {
            this.cableEarthed6 = '';
          }
          if (this.tests.loop_checked_6) {
            this.loopChecked6 = this.tests.loop_checked_6;
          } else {
            this.loopChecked6 = '';
          }
          if (this.tests.cable_fr20_6) {
            this.cableFr206 = this.tests.cable_fr20_6;
          } else {
            this.cableFr206 = '';
          }
          if (this.tests.cable_fr30_6) {
            this.cableFr306 = this.tests.cable_fr30_6;
          } else {
            this.cableFr306 = '';
          }
          if (this.tests.loop_configure_class_6) {
            this.loopConfigureClass6 = this.tests.loop_configure_class_6;
          } else {
            this.loopConfigureClass6 = '';
          }
          if (this.tests.loop_voltage_6) {
            this.loopVoltage6 = this.tests.loop_voltage_6;
          } else {
            this.loopVoltage6 = '';
          }
          if (this.tests.loop_1_comment_6) {
            this.loop1Comment6 = this.tests.loop_1_comment_6;
          } else {
            this.loop1Comment6 = '';
          }
          // LOOP 7
          if (this.tests.cable_termination_7) {
            this.cableTermination7 = this.tests.cable_termination_7;
          } else {
            this.cableTermination7 = '';
          }

          if (this.tests.feed_bridged_7) {
            this.feedBridged7 = this.tests.feed_bridged_7;
          } else {
            this.feedBridged7 = '';
          }
          if (this.tests.cable_earthed_7) {
            this.cableEarthed7 = this.tests.cable_earthed_7;
          } else {
            this.cableEarthed7 = '';
          }
          if (this.tests.loop_checked_7) {
            this.loopChecked7 = this.tests.loop_checked_7;
          } else {
            this.loopChecked7 = '';
          }
          if (this.tests.cable_fr20_7) {
            this.cableFr207 = this.tests.cable_fr20_7;
          } else {
            this.cableFr207 = '';
          }
          if (this.tests.cable_fr30_7) {
            this.cableFr307 = this.tests.cable_fr30_7;
          } else {
            this.cableFr307 = '';
          }
          if (this.tests.loop_configure_class_7) {
            this.loopConfigureClass7 = this.tests.loop_configure_class_7;
          } else {
            this.loopConfigureClass7 = '';
          }
          if (this.tests.loop_voltage_7) {
            this.loopVoltage7 = this.tests.loop_voltage_7;
          } else {
            this.loopVoltage7 = '';
          }
          if (this.tests.loop_1_comment_7) {
            this.loop1Comment7 = this.tests.loop_1_comment_7;
          } else {
            this.loop1Comment7 = '';
          }
          // eslint-disable-next-line max-len
          const updatePanels = [this.tests.service_cert_id, this.tests.service_type_id, this.tests.site_id, this.tests.tech_id, this.tests.panel_id, this.controlTests1, this.controlTestComment1, this.commTests2, this.commTestsComment2, this.batteryTests3, this.batteryTerminals3, this.batteryVoltageUnderLoad3, this.batteryVoltageNoLoad3, this.chargeVoltageBatteryConnected3, this.batteryTestsComment3, this.cableTermination4, this.feedBridged4, this.cableEarthed4, this.loopChecked4, this.cableFr204, this.cableFr304, this.loopConfigureClass4, this.loopVoltage4, this.loop1Comment4, this.cableTermination5, this.feedBridged5, this.cableEarthed5, this.loopChecked5, this.cableFr205, this.cableFr305, this.loopConfigureClass5, this.loopVoltage5, this.loop1Comment5, this.cableTermination6, this.feedBridged6, this.cableEarthed6, this.loopChecked6, this.cableFr206, this.cableFr306, this.loopConfigureClass6, this.loopVoltage6, this.loop1Comment6, this.cableTermination7, this.feedBridged7, this.cableEarthed7, this.loopChecked7, this.cableFr207, this.cableFr307, this.loopConfigureClass7, this.loopVoltage7, this.loop1Comment7];
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_template_panels_post_data SET service_cert_id=?, service_type_id=?, site_id=?, tech_id=?, panel_id=?, control_tests_1=?, control_test_comment_1=?, comm_tests_2=?, comm_tests_comment_2=?, battery_tests_3=?, battery_terminals_3=?, battery_voltage_under_load_3=?, battery_voltage_no_load_3=?, charge_voltage_battery_connected_3=?, battery_tests_comment_3=?, cable_termination_4=?, feed_bridged_4=?, cable_earthed_4=?, loop_checked_4=?, cable_fr20_4=?, cable_fr30_4=?, loop_configure_class_4=?, loop_voltage_4=?, loop_1_comment_4=?, cable_termination_5=?, feed_bridged_5=?, cable_earthed_5=?, loop_checked_5=?, cable_fr20_5=?, cable_fr30_5=?, loop_configure_class_5=?, loop_voltage_5=?, loop_1_comment_5=?,cable_termination_6=?, feed_bridged_6=?, cable_earthed_6=?, loop_checked_6=?, cable_fr20_6=?, cable_fr30_6=?, loop_configure_class_6=?, loop_voltage_6=?, loop_1_comment_6=?, cable_termination_7=?, feed_bridged_7=?, cable_earthed_7=?, loop_checked_7=?, cable_fr20_7=?, cable_fr30_7=?, loop_configure_class_7=?, loop_voltage_7=?, loop_1_comment_7=? WHERE id=${panelData.id}`,updatePanels)
          .then((res: any) => {
            console.log('fire_template_panels_post_data UPDATED: ' + JSON.stringify(res));
            this.presentToast('Panels testing successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('fire_template_panels_post_data ERROR: ' + JSON.stringify(err));
            this.presentToast('Panels testing could not be saved!');
          });

        } else { //INSERT
          if (this.tests.control_tests_1) {
            this.controlTests1 = this.tests.control_tests_1;
          } else {
            this.controlTests1 = '';
          }
          if (this.tests.control_test_comment_1) {
            this.controlTestComment1 = this.tests.control_test_comment_1;
          } else {
            this.controlTestComment1 = '';
          }
          if (this.tests.comm_tests_2) {
            this.commTests2 = this.tests.comm_tests_2;
          } else {
            this.commTests2 = '';
          }
          if (this.tests.comm_tests_comment_2) {
            this.commTestsComment2 = this.tests.comm_tests_comment_2;
          } else {
            this.commTestsComment2 = '';
          }
          if (this.tests.battery_tests_3) {
            this.batteryTests3 = this.tests.battery_tests_3;
          } else {
            this.batteryTests3 = '';
          }
          if (this.tests.battery_terminals_3) {
            this.batteryTerminals3 = this.tests.battery_terminals_3;
          } else {
            this.batteryTerminals3 = '';
          }
          if (this.tests.battery_voltage_under_load_3) {
            this.batteryVoltageUnderLoad3 = this.tests.battery_voltage_under_load_3;
          } else {
            this.batteryVoltageUnderLoad3 = '';
          }
          if (this.tests.battery_voltage_no_load_3) {
            this.batteryVoltageNoLoad3 = this.tests.battery_voltage_no_load_3;
          } else {
            this.batteryVoltageNoLoad3 = '';
          }
          if (this.tests.charge_voltage_battery_connected_3) {
            this.chargeVoltageBatteryConnected3 = this.tests.charge_voltage_battery_connected_3;
          } else {
            this.chargeVoltageBatteryConnected3 = '';
          }
          if (this.tests.battery_tests_comment_3) {
            this.batteryTestsComment3 = this.tests.battery_tests_comment_3;
          } else {
            this.batteryTestsComment3 = '';
          }
          // LOOP 1
          if (this.tests.cable_termination_4) {
            this.cableTermination4 = this.tests.cable_termination_4;
          } else {
            this.cableTermination4 = '';
          }

          if (this.tests.feed_bridged_4) {
            this.feedBridged4 = this.tests.feed_bridged_4;
          } else {
            this.feedBridged4 = '';
          }
          if (this.tests.cable_earthed_4) {
            this.cableEarthed4 = this.tests.cable_earthed_4;
          } else {
            this.cableEarthed4 = '';
          }
          if (this.tests.loop_checked_4) {
            this.loopChecked4 = this.tests.loop_checked_4;
          } else {
            this.loopChecked4 = '';
          }
          if (this.tests.cable_fr20_4) {
            this.cableFr204 = this.tests.cable_fr20_4;
          } else {
            this.cableFr204 = '';
          }
          if (this.tests.cable_fr30_4) {
            this.cableFr304 = this.tests.cable_fr30_4;
          } else {
            this.cableFr304 = '';
          }
          if (this.tests.loop_configure_class_4) {
            this.loopConfigureClass4 = this.tests.loop_configure_class_4;
          } else {
            this.loopConfigureClass4 = '';
          }
          if (this.tests.loop_voltage_4) {
            this.loopVoltage4 = this.tests.loop_voltage_4;
          } else {
            this.loopVoltage4 = '';
          }
          if (this.tests.loop_1_comment_4) {
            this.loop1Comment4 = this.tests.loop_1_comment_4;
          } else {
            this.loop1Comment4 = '';
          }
          // LOOP 2
          if (this.tests.cable_termination_5) {
            this.cableTermination5 = this.tests.cable_termination_5;
          } else {
            this.cableTermination5 = '';
          }

          if (this.tests.feed_bridged_5) {
            this.feedBridged5 = this.tests.feed_bridged_5;
          } else {
            this.feedBridged5 = '';
          }
          if (this.tests.cable_earthed_5) {
            this.cableEarthed5 = this.tests.cable_earthed_5;
          } else {
            this.cableEarthed5 = '';
          }
          if (this.tests.loop_checked_5) {
            this.loopChecked5 = this.tests.loop_checked_5;
          } else {
            this.loopChecked5 = '';
          }
          if (this.tests.cable_fr20_5) {
            this.cableFr205 = this.tests.cable_fr20_5;
          } else {
            this.cableFr205 = '';
          }
          if (this.tests.cable_fr30_5) {
            this.cableFr305 = this.tests.cable_fr30_5;
          } else {
            this.cableFr305 = '';
          }
          if (this.tests.loop_configure_class_5) {
            this.loopConfigureClass5 = this.tests.loop_configure_class_5;
          } else {
            this.loopConfigureClass5 = '';
          }
          if (this.tests.loop_voltage_5) {
            this.loopVoltage5 = this.tests.loop_voltage_5;
          } else {
            this.loopVoltage5 = '';
          }
          if (this.tests.loop_1_comment_5) {
            this.loop1Comment5 = this.tests.loop_1_comment_5;
          } else {
            this.loop1Comment5 = '';
          }
          // LOOP 3
          if (this.tests.cable_termination_6) {
            this.cableTermination6 = this.tests.cable_termination_6;
          } else {
            this.cableTermination6 = '';
          }
          if (this.tests.feed_bridged_6) {
            this.feedBridged6 = this.tests.feed_bridged_6;
          } else {
            this.feedBridged6 = '';
          }
          if (this.tests.cable_earthed_6) {
            this.cableEarthed6 = this.tests.cable_earthed_6;
          } else {
            this.cableEarthed6 = '';
          }
          if (this.tests.loop_checked_6) {
            this.loopChecked6 = this.tests.loop_checked_6;
          } else {
            this.loopChecked6 = '';
          }
          if (this.tests.cable_fr20_6) {
            this.cableFr206 = this.tests.cable_fr20_6;
          } else {
            this.cableFr206 = '';
          }
          if (this.tests.cable_fr30_6) {
            this.cableFr306 = this.tests.cable_fr30_6;
          } else {
            this.cableFr306 = '';
          }
          if (this.tests.loop_configure_class_6) {
            this.loopConfigureClass6 = this.tests.loop_configure_class_6;
          } else {
            this.loopConfigureClass6 = '';
          }
          if (this.tests.loop_voltage_6) {
            this.loopVoltage6 = this.tests.loop_voltage_6;
          } else {
            this.loopVoltage6 = '';
          }
          if (this.tests.loop_1_comment_6) {
            this.loop1Comment6 = this.tests.loop_1_comment_6;
          } else {
            this.loop1Comment6 = '';
          }
          // LOOP 7
          if (this.tests.cable_termination_7) {
            this.cableTermination7 = this.tests.cable_termination_7;
          } else {
            this.cableTermination7 = '';
          }

          if (this.tests.feed_bridged_7) {
            this.feedBridged7 = this.tests.feed_bridged_7;
          } else {
            this.feedBridged7 = '';
          }
          if (this.tests.cable_earthed_7) {
            this.cableEarthed7 = this.tests.cable_earthed_7;
          } else {
            this.cableEarthed7 = '';
          }
          if (this.tests.loop_checked_7) {
            this.loopChecked7 = this.tests.loop_checked_7;
          } else {
            this.loopChecked7 = '';
          }
          if (this.tests.cable_fr20_7) {
            this.cableFr207 = this.tests.cable_fr20_7;
          } else {
            this.cableFr207 = '';
          }
          if (this.tests.cable_fr30_7) {
            this.cableFr307 = this.tests.cable_fr30_7;
          } else {
            this.cableFr307 = '';
          }
          if (this.tests.loop_configure_class_7) {
            this.loopConfigureClass7 = this.tests.loop_configure_class_7;
          } else {
            this.loopConfigureClass7 = '';
          }
          if (this.tests.loop_voltage_7) {
            this.loopVoltage7 = this.tests.loop_voltage_7;
          } else {
            this.loopVoltage7 = '';
          }
          if (this.tests.loop_1_comment_7) {
            this.loop1Comment7 = this.tests.loop_1_comment_7;
          } else {
            this.loop1Comment7 = '';
          }
          const isSync = 'No';
          // eslint-disable-next-line max-len
          this.database.executeSql(`INSERT INTO fire_template_panels_post_data (service_cert_id,service_type_id,site_id,tech_id,panel_id,control_tests_1,control_test_comment_1,comm_tests_2 ,comm_tests_comment_2,battery_tests_3,battery_terminals_3,battery_voltage_under_load_3,battery_voltage_no_load_3,charge_voltage_battery_connected_3,battery_tests_comment_3,cable_termination_4,feed_bridged_4,cable_earthed_4,loop_checked_4,cable_fr20_4,cable_fr30_4,loop_configure_class_4,loop_voltage_4,loop_1_comment_4,cable_termination_5,feed_bridged_5,cable_earthed_5,loop_checked_5,cable_fr20_5,cable_fr30_5,loop_configure_class_5,loop_voltage_5,loop_1_comment_5,cable_termination_6,feed_bridged_6,cable_earthed_6,loop_checked_6,cable_fr20_6,cable_fr30_6,loop_configure_class_6,loop_voltage_6,loop_1_comment_6,cable_termination_7,feed_bridged_7,cable_earthed_7,loop_checked_7,cable_fr20_7,cable_fr30_7,loop_configure_class_7,loop_voltage_7,loop_1_comment_7,isSync,panel_date) VALUES ('${this.tests.service_cert_id}', '${this.tests.service_type_id}','${this.tests.site_id}','${this.tests.tech_id}','${this.tests.panel_id}','${this.controlTests1}','${this.controlTestComment1}','${this.commTests2}','${this.commTestsComment2}', '${this.batteryTests3}', '${this.batteryTerminals3}', '${this.batteryVoltageUnderLoad3}', '${this.batteryVoltageNoLoad3}', '${this.chargeVoltageBatteryConnected3}','${this.batteryTestsComment3}', '${this.cableTermination4}', '${this.feedBridged4}', '${this.cableEarthed4}', '${this.loopChecked4}', '${this.cableFr204}', '${this.cableFr304}', '${this.loopConfigureClass4}', '${this.loopVoltage4}', '${this.loop1Comment4}','${this.cableTermination5}', '${this.feedBridged5}', '${this.cableEarthed5}', '${this.loopChecked5}', '${this.cableFr205}', '${this.cableFr305}', '${this.loopConfigureClass5}', '${this.loopVoltage5}', '${this.loop1Comment5}','${this.cableTermination6}', '${this.feedBridged6}', '${this.cableEarthed6}', '${this.loopChecked6}', '${this.cableFr206}', '${this.cableFr306}', '${this.loopConfigureClass6}', '${this.loopVoltage6}', '${this.loop1Comment6}','${this.cableTermination7}', '${this.feedBridged7}', '${this.cableEarthed7}', '${this.loopChecked7}', '${this.cableFr207}', '${this.cableFr307}', '${this.loopConfigureClass7}', '${this.loopVoltage7}', '${this.loop1Comment7}', '${isSync}', '${this.tests.panel_date}' )`, [])
          .then((bs: any) => {
            console.log('fire_template_panels_post_data ADDED: ' + JSON.stringify(bs));
            this.presentToast('Panels testing successfully saved!');
            this.modalController.dismiss();
          }, err => {
            console.log('fire_template_panels_post_data ERROR: ' + JSON.stringify(err));
            this.presentToast('Panels testing could not be saved!');
          });
        }
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

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  dropTable() {
    this.database.executeSql(`DROP table fire_template_panels_post_data `, [])
      .then((resAdd: any) => {
        console.log('TABLE fire_template_panels_post_data REMOVED: ' + JSON.stringify(resAdd));
      });
  }

}
