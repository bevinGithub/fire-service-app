import { AutoManualSwitchPage } from './../auto-manual-switch/auto-manual-switch.page';
import { SuppressionCylinderPage } from './../suppression-cylinder/suppression-cylinder.page';
import { DoorMonitorPage } from './../door-monitor/door-monitor.page';
import { SuppressionDetonatorsPage } from './../suppression-detonators/suppression-detonators.page';
import { StrobesFunctionalPage } from './../strobes-functional/strobes-functional.page';
import { SoundersFunctionalPage } from './../sounders-functional/sounders-functional.page';
import { FireBellsPage } from './../fire-bells/fire-bells.page';
import { DoubleKnockPage } from './../double-knock/double-knock.page';
import { SingleKnockPage } from './../single-knock/single-knock.page';
import { MonitoringPage } from './../monitoring/monitoring.page';
import { OtherPage } from './../other/other.page';
import { FreshAirShutdownPage } from './../fresh-air-shutdown/fresh-air-shutdown.page';
import { AcShutdownPage } from './../ac-shutdown/ac-shutdown.page';
import { LiftHomingPage } from './../lift-homing/lift-homing.page';
import { CookerHeadPage } from './../cooker-head/cooker-head.page';
import { GasValvesPage } from './../gas-valves/gas-valves.page';
import { RemoteSignalPage } from './../remote-signal/remote-signal.page';
import { AutoEvacuationPage } from './../auto-evacuation/auto-evacuation.page';
import { EscapeDoorsPage } from './../escape-doors/escape-doors.page';
import { DoorHoldsPage } from './../door-holds/door-holds.page';
import { RollerShutterPage } from './../roller-shutter/roller-shutter.page';
import { SmokeVentilationPage } from './../smoke-ventilation/smoke-ventilation.page';
import { SmokeExtractionPage } from './../smoke-extraction/smoke-extraction.page';
import { LiftPressurePage } from './../lift-pressure/lift-pressure.page';
import { StairPressurePage } from './../stair-pressure/stair-pressure.page';
import { WireLessPage } from './../wire-less/wire-less.page';
import { FlameDetectionPage } from './../flame-detection/flame-detection.page';
import { LinerHeatPage } from './../liner-heat/liner-heat.page';
import { AirSamplingPage } from './../air-sampling/air-sampling.page';
import { BeamDetectionPage } from './../beam-detection/beam-detection.page';
import { TestDoubleKnockPage } from './../test-double-knock/test-double-knock.page';
import { TestDeviceKnockPage } from './../test-device-knock/test-device-knock.page';
import { CleaningDevicesPage } from './../cleaning-devices/cleaning-devices.page';
import { PreServiceCheckPage } from './../pre-service-check/pre-service-check.page';
import { BuildingStructuresPage } from './../building-structures/building-structures.page';
import { CallPointsPage } from './../call-points/call-points.page';
import { LogBookPage } from './../log-book/log-book.page';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CompanyRepSignaturePage } from 'src/app/modals/company-rep-signature/company-rep-signature.page';
import { ServiceClientSignaturePage } from 'src/app/modals/service-client-signature/service-client-signature.page';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { NgStyle } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-service-summary',
  templateUrl: './service-summary.page.html',
  styleUrls: ['./service-summary.page.scss'],
})
export class ServiceSummaryPage implements OnInit {
  public cert: any;
  public tech: any;
  public staff: any;
  certficateID: any;
  service: any = {};
  hideClientBtn: boolean;
  hideRepBtn: boolean;
  url = environment.url;
  clientSignature: any;
  repSignature: any;
  dateTechSigned: any;
  dateClientSigned: any;
  panels: any;
  site: any;
  networkStatus: any;
  isConnected: any;
  database: SQLiteObject;
  certOff: any;
  siteID: any;
  serviceTypeID: any;
  panelID1: any;
  panelID2: any;
  panelID3: any;
  panelID4: any;
  panelID5: any;
  panelID6: any;
  panelID7: any;
  panelID8: any;
  panelID9: any;
  panelID10: any;
  panelID11: any;
  panelID12: any;
  panelID13: any;
  panelID14: any;
  panelID15: any;
  panelID16: any;
  panelID17: any;
  panelID18: any;
  panelID19: any;
  panelID20: any;
  panelI21: any;
  panelID22: any;
  panelID23: any;
  panelID24: any;
  panelID25: any;

  panelD1: any;
  panelD2: any;
  panelD3: any;
  panelD4: any;
  panelD5: any;
  panelD6: any;
  panelD7: any;
  panelD8: any;
  panelD9: any;
  panelD10: any;
  panelD11: any;
  panelD12: any;
  panelD13: any;
  panelD14: any;
  panelD15: any;
  panelD16: any;
  panelD17: any;
  panelD18: any;
  panelD19: any;
  panelD20: any;
  panelD21: any;
  panelD22: any;
  panelD23: any;
  panelD24: any;
  panelD25: any;
  // POINT 1
  logBook: any;
  eventArchive: any;
  analogueVal: any;
  configCheck: any;
  disableDevice: any;

  // POINT 2
  callPoints: any;
  buildStructures: any;

  // POINT 3
  firePanel1: any;
  firePanel2: any;
  firePanel3: any;
  firePanel4: any;
  firePanel5: any;
  firePanel6: any;
  firePanel7: any;
  firePanel8: any;
  firePanel9: any;
  firePanel10: any;
  firePanel11: any;
  firePanel12: any;
  firePanel13: any;
  firePanel14: any;
  firePanel15: any;
  firePanel16: any;
  firePanel17: any;
  firePanel18: any;
  firePanel19: any;
  firePanel20: any;
  firePanel21: any;
  firePanel22: any;
  firePanel23: any;
  firePanel24: any;
  firePanel25: any;

  // POINT 4
  cleanDevice1: any;
  cleanDevice2: any;
  cleanDevice3: any;
  cleanDevice4: any;
  cleanDevice5: any;
  cleanDevice6: any;
  cleanDevice7: any;
  cleanDevice8: any;
  cleanDevice9: any;
  cleanDevice10: any;
  cleanDevice11: any;
  cleanDevice12: any;
  cleanDevice13: any;
  cleanDevice14: any;
  cleanDevice15: any;
  cleanDevice16: any;
  cleanDevice17: any;
  cleanDevice18: any;
  cleanDevice19: any;
  cleanDevice20: any;
  cleanDevice21: any;
  cleanDevice22: any;
  cleanDevice23: any;
  cleanDevice24: any;
  cleanDevice25: any;

  // POINT 5.1 test_device_single_knock_5_1
  testDeviceSingleKnock1: any;
  testDeviceSingleKnock2: any;
  testDeviceSingleKnock3: any;
  testDeviceSingleKnock4: any;
  testDeviceSingleKnock5: any;
  testDeviceSingleKnock6: any;
  testDeviceSingleKnock7: any;
  testDeviceSingleKnock8: any;
  testDeviceSingleKnock9: any;
  testDeviceSingleKnock10: any;
  testDeviceSingleKnock11: any;
  testDeviceSingleKnock12: any;
  testDeviceSingleKnock13: any;
  testDeviceSingleKnock14: any;
  testDeviceSingleKnock15: any;
  testDeviceSingleKnock16: any;
  testDeviceSingleKnock17: any;
  testDeviceSingleKnock18: any;
  testDeviceSingleKnock19: any;
  testDeviceSingleKnock20: any;
  testDeviceSingleKnock21: any;
  testDeviceSingleKnock22: any;
  testDeviceSingleKnock23: any;
  testDeviceSingleKnock24: any;
  testDeviceSingleKnock25: any;

  //POINT 5.2 test_sounders_single_knock_5_1
  testSoundersSingleKnock1: any;
  testSoundersSingleKnock2: any;
  testSoundersSingleKnock3: any;
  testSoundersSingleKnock4: any;
  testSoundersSingleKnock5: any;
  testSoundersSingleKnock6: any;
  testSoundersSingleKnock7: any;
  testSoundersSingleKnock8: any;
  testSoundersSingleKnock9: any;
  testSoundersSingleKnock10: any;
  testSoundersSingleKnock11: any;
  testSoundersSingleKnock12: any;
  testSoundersSingleKnock13: any;
  testSoundersSingleKnock14: any;
  testSoundersSingleKnock15: any;
  testSoundersSingleKnock16: any;
  testSoundersSingleKnock17: any;
  testSoundersSingleKnock18: any;
  testSoundersSingleKnock19: any;
  testSoundersSingleKnock20: any;
  testSoundersSingleKnock21: any;
  testSoundersSingleKnock22: any;
  testSoundersSingleKnock23: any;
  testSoundersSingleKnock24: any;
  testSoundersSingleKnock25: any;

  // POINT 6
  beamDetection: any;
  airSampling: any;
  linerHeat: any;
  flameDetection: any;
  wireless: any;

  // POINT 7
  stairPressure: any;
  liftPressure: any;
  smokeExtraction: any;
  smokeVentiltion: any;
  rollerShutter: any;
  fireDoors: any;
  escapeDoorRelease: any;
  autoEvacuation: any;
  autoRemoteSignal: any;
  gasValves: any;
  cookerSuppression: any;
  liftHoming: any;
  acShutdown: any;
  freshAir: any;
  other7: any;

  // POINT 8
  escapeDoors: any;
  sprinklerFlow: any;
  sprinklerPumpRoom: any;
  sumpPump: any;
  generatorSignals: any;
  other: any;

  // POINT 9
  singleKnock: any;
  doubleKnock: any;
  fireBells: any;
  soundersFunction: any;
  strobesFunction: any;
  suppressionDetonators: any;
  doorMonitor: any;
  suppressionCylinder: any;
  manualSwitch: any;
  updateSC: any;
  signOff: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
    private navController: NavController,
    private formBuilder: FormBuilder,
  ) {
    this.signOff = false;
    this.certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    console.log(this.certficateID);
    this.http.get(this.url + 'get-service-certificate.php?id=' + this.certficateID).subscribe((data: any) => {
      console.log(data);
      this.cert = data?.certificate;
      this.tech = data?.technician;
      this.staff = data?.staff;
      this.service.id = this.cert?.id;
      this.service.service_certificate_number = this?.cert.service_certificate_number;
      this.service.service_request_id = this?.cert.service_request_id;
      this.service.technician_id = this?.cert.service_technician_id;
      this.panels = data?.panels;
      this.site = data?.site;
      this.siteID = data?.certificate.site_id;
      this.serviceTypeID = data?.certificate.service_type_id;
      if (this.panels[0] !== undefined) {
        this.panelD1 = this.panels[0];
      } else {
        this.panelD1 =  'none';
      }
      if (this.panels[1] !== undefined) {
        this.panelD2 = this.panels[1];
      } else {
        this.panelD2 =  'none';
      }
      if (this.panels[2] !== undefined) {
        this.panelD3 = this.panels[2];
      } else {
        this.panelD3 =  'none';
      }
      if (this.panels[3] !== undefined) {
        this.panelD4 = this.panels[3];
      } else {
        this.panelD4 =  'none';
      }
      if (this.panels[4] !== undefined) {
        this.panelD5 = this.panels[4];
      } else {
        this.panelD5 =  'none';
      }
      if (this.panels[5] !== undefined) {
        this.panelD1 = this.panels[5];
      } else {
        this.panelD6 =  'none';
      }
      if (this.panels[0] !== undefined) {
        this.panelD1 = this.panels[0];
      } else {
        this.panelD3 =  'none';
      }
      if (this.panels[6] !== undefined) {
        this.panelD7 = this.panels[6];
      } else {
        this.panelD7 =  'none';
      }
      if (this.panels[7] !== undefined) {
        this.panelD8 = this.panels[7];
      } else {
        this.panelD8 =  'none';
      }
      if (this.panels[8] !== undefined) {
        this.panelD9 = this.panels[8];
      } else {
        this.panelD9 =  'none';
      }
      if (this.panels[9] !== undefined) {
        this.panelD10 = this.panels[9];
      } else {
        this.panelD10 =  'none';
      }
      console.log('Index 10: ' +this.panelD10);
    });
    this.hideClientBtn  = false;
    this.hideRepBtn = false;
    this.dateClientSigned = moment(new Date()).format('YYYY-MM-DD');
    this.dateTechSigned = moment(new Date()).format('YYYY-MM-DD');
    this.service.date_completed = moment(new Date()).format('YYYY-MM-DD');
    this.service.date_client_signed = this.dateClientSigned;
    this.service.date_tech_signed = this.dateTechSigned;
    this.service.isSync = 'No';
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    console.log(this.certficateID);
    this.http.get(this.url + 'get-service-certificate.php?id=' + this.certficateID).subscribe((data: any) => {
      console.log(data);
      this.cert = data?.certificate;
      this.tech = data?.technician;
      this.staff = data?.staff;
      this.service.id = this.cert?.id;
      this.service.service_certificate_number = this?.cert.service_certificate_number;
      this.service.service_request_id = this?.cert.service_request_id;
      this.service.technician_id = this?.cert.service_technician_id;
      this.panels = data?.panels;
      this.site = data?.site;
      this.service.flame_detection_6_4 = this.cert.flame_detection_6_4;
    });

    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
      this.service.id = this.certficateID;
      this.getOfflineSC(this.certficateID);
    }
  }

  ionViewDidEnter(){

  }

  getOfflineSC(scID) {
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
     }).then((db: SQLiteObject) => {
       this.database = db;
       console.log(scID);
    const offData = [];
    // eslint-disable-next-line max-len
    const querySC = 'SELECT * FROM fire_service_certificates INNER JOIN fire_service_type_templates ON fire_service_certificates.service_type_id=fire_service_type_templates.id JOIN fire_sites ON fire_service_certificates.site_id = fire_sites.site_id   WHERE fire_service_certificates.cert_id=?';
    this.database.executeSql(querySC,[scID]).then((rec: any) => {
      if (rec.rows.length > 0) {
       this.cert = rec.rows.item(0);
       console.log('Record Found: ' + JSON.stringify(this.cert));
        this.siteID = this.cert.site_id;
        this.serviceTypeID = this.cert.service_type_id;
        //  console.log(this.cert);
        if (this.cert?.log_book_analysis_1_1) {
          this.service.log_book_analysis_1_1 = this.cert?.log_book_analysis_1_1;
        } else {
          this.service.log_book_analysis_1_1 = '';
        }
        if (this.cert?.event_archive_1_2) {
          this.service.event_archive_1_2 = this.cert?.event_archive_1_2;
        } else {
          this.service.event_archive_1_2 = '';
        }
        if (this.cert?.analogue_value_check_1_3) {
          this.service.analogue_values_1_3 = this.cert?.analogue_value_check_1_3;
        } else {
          this.service.analogue_values_1_3 = '';
        }
        if (this.cert?.configuration_check_programming_1_4) {
          this.service.configuration_check_programming_1_4 = this.cert?.configuration_check_programming_1_4;
        } else {
          this.service.configuration_check_programming_1_4 =  '';
        }
        if (this.cert?.disabled_device_check) {
          this.service.disable_device_1_5 = this.cert?.disabled_device_check;
        } else {
          this.service.disable_device_1_5 = '';
        }
        if (this.cert?.call_points_2_1)  {
          this.service.call_points_2_1 = this.cert?.call_points_2_1;
        } else {
          this.service.call_points_2_1 = '';
        }
        if (this.cert?.building_structure_changes_2_2) {
          this.service.building_structure_2_2 = this.cert?.building_structure_changes_2_2;
        } else {
          this.service.building_structure_2_2 = '';
        }
        // POINT 3
        if (this.cert?.fire_panel_1) {
          this.service.fire_panel_1 = this.cert?.fire_panel_1;
        } else {
          this.service.fire_panel_1 = '';
        }
        if (this.cert?.fire_panel_2) {
          this.service.fire_panel_2 = this.cert?.fire_panel_2;
        } else {
          this.service.fire_panel_2 = '';
        }
        if (this.cert?.fire_panel_3) {
          this.service.fire_panel_3 = this.cert?.fire_panel_3;
        } else {
          this.service.fire_panel_3 = '';
        }
        if (this.cert?.fire_panel_4) {
          this.service.fire_panel_4 = this.cert?.fire_panel_4;
        } else {
          this.service.fire_panel_4 = '';
        }
        if (this.cert?.fire_panel_5) {
          this.service.fire_panel_5 = this.cert?.fire_panel_5;
        } else {
          this.service.fire_panel_5 = '';
        }
        if (this.cert?.fire_panel_6) {
          this.service.fire_panel_6 = this.cert?.fire_panel_6;
        } else {
          this.service.fire_panel_6 = '';
        }
        if (this.cert?.fire_panel_7) {
          this.service.fire_panel_7 = this.cert?.fire_panel_7;
        } else {
          this.service.fire_panel_7 = '';
        }
        if (this.cert?.fire_panel_8) {
          this.service.fire_panel_8 = this.cert?.fire_panel_8;
        } else {
          this.service.fire_panel_8 = '';
        }
        if (this.cert?.fire_panel_9) {
          this.service.fire_panel_9 = this.cert?.fire_panel_9;
        } else {
          this.service.fire_panel_9 = '';
        }
        if (this.cert?.fire_panel_10) {
          this.service.fire_panel_10 = this.cert?.fire_panel_10;
        } else {
          this.service.fire_panel_10 = '';
        }
        // POINT 4 Cleaning Devices clean_device_1
        if (this.cert?.clean_device_1) {
          this.service.clean_device_1 = this.cert?.clean_device_1;
        } else {
          this.service.clean_device_1 = '';
        }
        if (this.cert?.clean_device_2) {
          this.service.clean_device_2 = this.cert?.clean_device_2;
        } else {
          this.service.clean_device_2 = '';
        }
        if (this.cert?.clean_device_3) {
          this.service.clean_device_3 = this.cert?.clean_device_3;
        } else {
          this.service.clean_device_3 = '';
        }
        if (this.cert?.clean_device_4) {
          this.service.clean_device_4 = this.cert?.clean_device_4;
        } else {
          this.service.clean_device_4 = '';
        }
        if (this.cert?.clean_device_5) {
          this.service.clean_device_5 = this.cert?.clean_device_5;
        } else {
          this.service.clean_device_5 = '';
        }
        if (this.cert?.clean_device_6) {
          this.service.clean_device_6 = this.cert?.clean_device_6;
        } else {
          this.service.clean_device_6 = '';
        }
        if (this.cert?.clean_device_7) {
          this.service.clean_device_7 = this.cert?.clean_device_7;
        } else {
          this.service.clean_device_7 = '';
        }
        if (this.cert?.clean_device_8) {
          this.service.clean_device_8 = this.cert?.clean_device_8;
        } else {
          this.service.clean_device_8 = '';
        }
        if (this.cert?.clean_device_9) {
          this.service.clean_device_9 = this.cert?.clean_device_9;
        } else {
          this.service.clean_device_9 = '';
        }
        if (this.cert?.clean_device_10) {
          this.service.clean_device_10 = this.cert?.clean_device_10;
        } else {
          this.service.clean_device_10 = '';
        }

        // POINT 5.1 test_device_single_knock_5_1
        if (this.cert?.test_device_single_knock_5_1) {
          this.service.test_device_single_knock_5_1 = this.cert?.test_device_single_knock_5_1;
        } else {
          this.service.test_device_single_knock_5_1 = '';
        }
        if (this.cert?.test_device_single_knock_5_2) {
          this.service.test_device_single_knock_5_2 = this.cert?.test_device_single_knock_5_2;
        } else {
          this.service.test_device_single_knock_5_2 = '';
        }
        if (this.cert?.test_device_single_knock_5_3) {
          this.service.test_device_single_knock_5_3 = this.cert?.test_device_single_knock_5_3;
        } else {
          this.service.test_device_single_knock_5_3 = '';
        }
        if (this.cert?.test_device_single_knock_5_4) {
          this.service.test_device_single_knock_5_4 = this.cert?.test_device_single_knock_5_4;
        } else {
          this.service.test_device_single_knock_5_4 = '';
        }
        if (this.cert?.test_device_single_knock_5_5) {
          this.service.test_device_single_knock_5_5 = this.cert?.test_device_single_knock_5_5;
        } else {
          this.service.test_device_single_knock_5_5 = '';
        }
        if (this.cert?.test_device_single_knock_5_6) {
          this.service.test_device_single_knock_5_6 = this.cert?.test_device_single_knock_5_6;
        } else {
          this.service.test_device_single_knock_5_6 = '';
        }
        if (this.cert?.test_device_single_knock_5_7) {
          this.service.test_device_single_knock_5_7 = this.cert?.test_device_single_knock_5_7;
        } else {
          this.service.test_device_single_knock_5_7 = '';
        }
        if (this.cert?.test_device_single_knock_5_8) {
          this.service.test_device_single_knock_5_8 = this.cert?.test_device_single_knock_5_8;
        } else {
          this.service.test_device_single_knock_5_8 = '';
        }
        if (this.cert?.test_device_single_knock_5_9) {
          this.service.test_device_single_knock_5_9 = this.cert?.test_device_single_knock_5_9;
        } else {
          this.service.test_device_single_knock_5_9 = '';
        }
        if (this.cert?.test_device_single_knock_5_10) {
          this.service.test_device_single_knock_5_10 = this.cert?.test_device_single_knock_5_10;
        } else {
          this.service.test_device_single_knock_5_10 = '';
        }

        // POINT 5.2 Testing Devices Sounders Knock test_sounders_single_knock_5_1
        if (this.cert?.test_sounders_single_knock_5_1) {
          this.service.test_sounders_single_knock_5_1 = this.cert?.test_sounders_single_knock_5_1;
        } else {
          this.service.test_sounders_single_knock_5_1 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_2) {
          this.service.test_sounders_single_knock_5_2 = this.cert?.test_sounders_single_knock_5_2;
        } else {
          this.service.test_sounders_single_knock_5_2 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_3) {
          this.service.test_sounders_single_knock_5_3 = this.cert?.test_sounders_single_knock_5_3;
        } else {
          this.service.test_sounders_single_knock_5_3 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_4) {
          this.service.test_sounders_single_knock_5_4 = this.cert?.test_sounders_single_knock_5_4;
        } else {
          this.service.test_sounders_single_knock_5_4 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_5) {
          this.service.test_sounders_single_knock_5_5 = this.cert?.test_sounders_single_knock_5_5;
        } else {
          this.service.test_sounders_single_knock_5_5 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_6) {
          this.service.test_sounders_single_knock_5_6 = this.cert?.test_sounders_single_knock_5_6;
        } else {
          this.service.test_sounders_single_knock_5_6 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_7) {
          this.service.test_sounders_single_knock_5_7 = this.cert?.test_sounders_single_knock_5_7;
        } else {
          this.service.test_sounders_single_knock_5_7 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_8) {
          this.service.test_sounders_single_knock_5_8 = this.cert?.test_sounders_single_knock_5_8;
        } else {
          this.service.test_sounders_single_knock_5_8 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_9) {
          this.service.test_sounders_single_knock_5_9 = this.cert?.test_sounders_single_knock_5_9;
        } else {
          this.service.test_sounders_single_knock_5_9 = '';
        }
        if (this.cert?.test_sounders_single_knock_5_10) {
          this.service.test_sounders_single_knock_5_10 = this.cert?.test_sounders_single_knock_5_10;
        } else {
          this.service.test_sounders_single_knock_5_10 = '';
        }

        //  POINT 6
        if (this.cert?.beam_detection_6_1) {
          this.service.beam_detection_6_1 = this.cert?.beam_detection_6_1;
        } else {
          this.service.beam_detection_6_1 = '';
        }
        if (this.cert?.air_sampling_6_2) {
          this.service.air_sampling_6_2 = this.cert?.air_sampling_6_2;
        } else {
          this.service.air_sampling_6_2 = '';
        }
        if (this.cert?.liner_heat_6_3) {
          this.service.liner_heat_6_3 = this.cert?.liner_heat_6_3;
        } else {
          this.service.liner_heat_6_3 = '';
        }
        if (this.cert?.flame_detection_6_4) {
          this.service.flame_detection_6_4 = this.cert?.flame_detection_6_4;
        } else {
          this.service.flame_detection_6_4 = '';
        }
        if (this.cert?.wireless_6_5) {
          this.service.wireless_6_5 = this.cert?.wireless_6_5;
        } else {
          this.service.wireless_6_5 = '';
        }
        // POINT 7
        if (this.cert?.stair_pressure_fans_7_1) {
          this.service.stair_pressure_fans_7_1 = this.cert?.stair_pressure_fans_7_1;
        } else {
          this.service.stair_pressure_fans_7_1 = '';
        }
        if (this.cert?.lift_pressure_fans_7_2) {
          this.service.lift_pressure_fans_7_2 = this.cert?.lift_pressure_fans_7_2;
        } else {
          this.service.lift_pressure_fans_7_2 = '';
        }
        if (this.cert?.smoke_extraction_fans_7_3) {
          this.service.smoke_extraction_fans_7_3 = this.cert?.smoke_extraction_fans_7_3;
        } else {
          this.service.smoke_extraction_fans_7_3 = '';
        }
        if (this.cert?.smoke_ventilation_louvers_7_4) {
          this.service.smoke_ventilation_louvers_7_4 = this.cert?.smoke_ventilation_louvers_7_4;
        } else {
          this.service.smoke_ventilation_louvers_7_4 = '';
        }
        if (this.cert?.roller_shutter_doors_7_5) {
          this.service.roller_shutter_doors_7_5 = this.cert?.roller_shutter_doors_7_5;
        } else {
          this.service.roller_shutter_doors_7_5 = '';
        }
        if (this.cert?.fire_doors_7_6) {
          this.service.fire_doors_7_6 = this.cert?.fire_doors_7_6;
        } else {
          this.service.fire_doors_7_6 = '';
        }
        if (this.cert?.escape_door_release_7_7) {
          this.service.escape_door_release_7_7 = this.cert?.escape_door_release_7_7;
        } else {
          this.service.escape_door_release_7_7 = '';
        }
        if (this.cert?.auto_evacuation_7_8) {
          this.service.auto_evacuation_7_8 = this.cert?.auto_evacuation_7_8;
        } else {
          this.service.auto_evacuation_7_8 = '';
        }
        if (this.cert?.auto_remote_signal_7_9) {
          this.service.auto_remote_signal_7_9 = this.cert?.auto_remote_signal_7_9;
        } else {
          this.service.auto_remote_signal_7_9 = '';
        }
        if (this.cert?.gas_valves_7_10) {
          this.service.gas_valves_7_10 = this.cert?.gas_valves_7_10;
        } else {
          this.service.gas_valves_7_10 = '';
        }
        if (this.cert?.cooker_suppression_7_11) {
          this.service.cooker_suppression_7_11 = this.cert?.cooker_suppression_7_11;
        } else {
          this.service.cooker_suppression_7_11 = '';
        }
        if (this.cert?.lift_homing_7_12) {
          this.service.lift_homing_7_12 = this.cert?.lift_homing_7_12;
        } else {
          this.service.lift_homing_7_12 = '';
        }
        if (this.cert?.ac_shutdown_7_13) {
          this.service.ac_shutdown_7_13 = this.cert?.ac_shutdown_7_13;
        } else {
          this.service.ac_shutdown_7_13 = '';
        }
        if (this.cert?.fresh_air_shutdown_7_14) {
          this.service.fresh_air_shutdown_7_14 = this.cert?.fresh_air_shutdown_7_14;
        } else {
          this.service.fresh_air_shutdown_7_14 = '';
        }
        if (this.cert?.other_7_15) {
          this.service.other_7_15 = this.cert?.other_7_15;
        } else {
          this.service.other_7_15 = '';
        }
        // POINT 8
        if (this.cert?.escape_doors_8_1) {
          this.service.escape_doors_8_1 = this.cert?.escape_doors_8_1;
        } else {
          this.service.escape_doors_8_1 = '';
        }
        if (this.cert?.sprinkler_flow_8_2) {
          this.service.sprinkler_flow_8_2 = this.cert?.sprinkler_flow_8_2;
        } else {
          this.service.sprinkler_flow_8_2 = '';
        }
        if (this.cert?.sprinkler_pump_room_8_3) {
          this.service.sprinkler_pump_room_8_3 = this.cert?.sprinkler_pump_room_8_3;
        } else {
          this.service.sprinkler_pump_room_8_3 = '';
        }
        if (this.cert?.sump_pump_8_4) {
          this.service.sump_pump_8_4 = this.cert?.sump_pump_8_4;
        } else {
          this.service.sump_pump_8_4 = '';
        }
        if (this.cert?.generator_signals_8_5) {
          this.service.generator_signals_8_5 = this.cert?.generator_signals_8_5;
        } else {
          this.service.generator_signals_8_5 = '';
        }
        if (this.cert?.other_8_6) {
          this.service.other_8_6 = this.cert?.other_8_6;
        } else {
          this.service.other_8_6 = '';
        }
        // POINT 9
        if (this.cert?.single_knock_9_1) {
          this.service.single_knock_9_1 = this.cert?.single_knock_9_1;
        } else {
          this.service.single_knock_9_1 = '';
        }
        if (this.cert?.double_knock_9_2) {
          this.service.double_knock_9_2 = this.cert?.double_knock_9_2;
        } else {
          this.service.double_knock_9_2 = '';
        }
        if (this.cert?.fire_bells_9_3) {
          this.service.fire_bells_9_3 = this.cert?.fire_bells_9_3;
        } else {
          this.service.fire_bells_9_3 = '';
        }
        if (this.cert?.sounders_functional_9_4) {
          this.service.sounders_functional_9_4 = this.cert?.sounders_functional_9_4;
        } else {
          this.service.sounders_functional_9_4 = '';
        }
        if (this.cert?.strobes_functional_9_5) {
          this.service.strobes_functional_9_5 = this.cert?.strobes_functional_9_5;
        } else {
          this.service.strobes_functional_9_5 = '';
        }
        if (this.cert?.suppression_detonator_9_6) {
          this.service.suppression_detonator_9_6 = this.cert?.suppression_detonator_9_6;
        } else {
          this.service.suppression_detonator_9_6 = '';
        }
        if (this.cert?.door_monitor_9_7) {
          this.service.door_monitor_9_7 = this.cert.door_monitor_9_7;
        } else {
          this.service.door_monitor_9_7 = '';
        }
        if (this.cert?.suppression_cylinder_9_8) {
          this.service.suppression_cylinder_9_8 = this.cert.suppression_cylinder_9_8;
        } else {
          this.service.suppression_cylinder_9_8 = '';
        }
        if (this.cert?.manual_switch_9_9) {
          this.service.manual_switch_9_9 = this.cert.manual_switch_9_9;
        } else {
          this.service.manual_switch_9_9 = '';
        }

        //#GET TECH DATA
        const query = 'SELECT * FROM fire_users WHERE user_id=?';
        this.database.executeSql(query, [this.cert?.service_technician_id]).then((res2: any) => {
            console.log('TECH DATA: ' + JSON.stringify(res2));
            if (res2.rows.length > 0) {
              this.tech = res2.rows.item(0);
            }
        });
        //GET PANELSQ
        const queryPanels = 'SELECT * FROM fire_template_panels WHERE service_type_id=? AND site_id=?';
        this.database.executeSql(queryPanels, [this.cert?.service_type_id, this.cert?.site_id]).then((resP: any) => {
            console.log('PANEL DATA: ' + JSON.stringify(resP));
            const panelList = [];
            if (resP.rows.length > 0) {
              for(let i = 0; i <  resP.rows.length; i++) {
                panelList.push(resP.rows.item(i));
              }
              this.panels = panelList;
              console.log(this.panels);
              if (this.panels.length > 0 && this.panels[0]) {
                this.panelID1 = this.panels[0].panel_id;
              } else {
                this.panelID1 = '';
              }
              if (this.panels.length > 0 && this.panels[1]) {
                this.panelID2 = this.panels[1].panel_id;
              } else {
                this.panelID2 = '';
              }
              if (this.panels.length > 0 && this.panels[2]) {
                this.panelID3 = this.panels[2].panel_id;
              } else {
                this.panelID3 = '';
              }
              if (this.panels.length > 0 && this.panels[3]) {
                this.panelID4 = this.panels[3].panel_id;
              } else {
                this.panelID4 = '';
              }
              if (this.panels.length > 0 && this.panels[4]) {
                this.panelID5 = this.panels[4].panel_id;
              } else {
                this.panelID5 = '';
              }
              if (this.panels.length > 0 && this.panels[5]) {
                this.panelID6 = this.panels[5].panel_id;
              } else {
                this.panelID6 = '';
              }
              if (this.panels.length > 0 && this.panels[6]) {
                this.panelID7 = this.panels[6].panel_id;
              } else {
                this.panelID7 = '';
              }
              if (this.panels.length > 0 && this.panels[7]) {
                this.panelID8 = this.panels[7].panel_id;
              } else {
                this.panelID8 = '';
              }
              if (this.panels.length > 0 && this.panels[8]) {
                this.panelID9 = this.panels[8].panel_id;
              } else {
                this.panelID9 = '';
              }
              if (this.panels.length > 0 && this.panels[9]) {
                this.panelID10 = this.panels[9].panel_id;
              } else {
                this.panelID10 = '';
              }

              // offline
              if (this.panels[0] !== undefined) {
                this.panelD1 = this.panels[0];
              } else {
                this.panelD1 =  'none';
              }
              if (this.panels[1] !== undefined) {
                this.panelD2 = this.panels[1];
              } else {
                this.panelD2 =  'none';
              }
              if (this.panels[2] !== undefined) {
                this.panelD3 = this.panels[2];
              } else {
                this.panelD3 =  'none';
              }
              if (this.panels[3] !== undefined) {
                this.panelD4 = this.panels[3];
              } else {
                this.panelD4 =  'none';
              }
              if (this.panels[4] !== undefined) {
                this.panelD5 = this.panels[4];
              } else {
                this.panelD5 =  'none';
              }
              if (this.panels[5] !== undefined) {
                this.panelD1 = this.panels[5];
              } else {
                this.panelD6 =  'none';
              }
              if (this.panels[0] !== undefined) {
                this.panelD1 = this.panels[0];
              } else {
                this.panelD3 =  'none';
              }
              if (this.panels[6] !== undefined) {
                this.panelD7 = this.panels[6];
              } else {
                this.panelD7 =  'none';
              }
              if (this.panels[7] !== undefined) {
                this.panelD8 = this.panels[7];
              } else {
                this.panelD8 =  'none';
              }
              if (this.panels[8] !== undefined) {
                this.panelD9 = this.panels[8];
              } else {
                this.panelD9 =  'none';
              }
              if (this.panels[9] !== undefined) {
                this.panelD10 = this.panels[9];
              } else {
                this.panelD10 =  'none';
              }
            }
        });

        }
      });
     });
  }


  async clientSignOff() {
        const modal = await this.modalController.create({
        component: ServiceClientSignaturePage,
        componentProps: {
          contractNumber: this.cert.service_contract_number,
          certificateNumber: this.cert.service_certificate_number,
          responsiblePerson: this.cert.responsible_person,
        }
      });
      await modal.present();

      modal.onDidDismiss().then((res: any) => {
        console.log(res);
        this.service.client_signature = res.data.clientSignature;
        this.clientSignature = res.data.clientSignature;
        this.service.date_signed_off_client = moment().format('YYYY-MM-DD HH:mm:ss');
        this.hideClientBtn  = true;
      });
  }

  async techSignOff() {
    const modal = await this.modalController.create({
      component: CompanyRepSignaturePage,
      componentProps: {
        contractNumber: this.cert.service_contract_number,
        certificateNumber: this.cert.service_certificate_number,
        responsiblePerson: this.tech.firstname + ' ' + this.tech.surname ,
      }
    });
    await modal.present();

    modal.onDidDismiss().then((res: any) => {
      console.log(res);
      this.service.company_rep_signature = res.data.companyRepSignature;
      this.repSignature = res.data.companyRepSignature;
      this.service.date_signed_off = moment().format('YYYY-MM-DD HH:mm:ss');
      this.hideRepBtn = true;
    });
  }

  async logBookModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: LogBookPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async callPointsModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: CallPointsPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async buildingStructuresModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: BuildingStructuresPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async preServiceCheckModal(certID,panelsID) {
    console.log('Service Certificate ID: ' + certID + '--- PanelID: ' + panelsID);
    const modal = await this.modalController.create({
      component: PreServiceCheckPage,
      componentProps: {
        cert: certID,
        panel: panelsID
      }
    });
    await modal.present();
  }

  async cleaningDevicesModal(serviceTypeID, siteID, panelID) {
    console.log('Service Certificate ID: ' + serviceTypeID + '--- PanelID: ' + siteID);
    const modal = await this.modalController.create({
      component: CleaningDevicesPage,
      componentProps: {
        site: siteID,
        serviceType: serviceTypeID,
        panel: panelID,
      }
    });
    await modal.present();
  }

  async testDeviceKnockModal(serviceTypeID, siteID, panelsID) {
    console.log('Service Certificate ID: ' + serviceTypeID + '--- SiteID: ' + siteID + ' -----PanelID' + panelsID);
    const modal = await this.modalController.create({
      component: TestDeviceKnockPage,
      componentProps: {
        site: siteID,
        serviceType: serviceTypeID,
        panel: panelsID,
      }
    });
    await modal.present();
  }

  async testSounderKockModal(serviceTypeID, siteID, panelsID) {
    console.log('Service Certificate ID: ' + serviceTypeID + '--- SiteID: ' + siteID + ' -----PanelID: ' + panelsID);
    const modal = await this.modalController.create({
      component: TestDoubleKnockPage,
      componentProps: {
        site: siteID,
        serviceType: serviceTypeID,
        panel: panelsID,
      }
    });
    await modal.present();
  }

  async beamDetectionModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: BeamDetectionPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async airSamplingModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: AirSamplingPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async linerHeatModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: LinerHeatPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async flameDetectionModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: FlameDetectionPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async wirelessModal(serviceTypeID, siteID) {
    console.log('Service Certificate ID: ' + serviceTypeID + '--- SiteID: ' + siteID);
    const modal = await this.modalController.create({
      component: WireLessPage,
      componentProps: {
        site: siteID,
        serviceType: serviceTypeID,
      }
    });
    await modal.present();
  }

  async stairPressureModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: StairPressurePage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async liftPressureModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: LiftPressurePage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async smokeExtractionModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: SmokeExtractionPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async smokeVentilationModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: SmokeVentilationPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async rollerShutterModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: RollerShutterPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async doorHoldsModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: DoorHoldsPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async escapeDoorsModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: EscapeDoorsPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async remoteSignalModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: RemoteSignalPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async gasValvesModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: GasValvesPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }


  async autoEvacuationModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: AutoEvacuationPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async cookerHeadModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: CookerHeadPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async liftHomingModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: LiftHomingPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async acShutdownModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: AcShutdownPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async freshAirShutModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: FreshAirShutdownPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async otherModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: OtherPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async monitoringModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: MonitoringPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async singleKnockModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: SingleKnockPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async doubleKnockModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: DoubleKnockPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async fireBellsModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: FireBellsPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async soundersFunctionalModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: SoundersFunctionalPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async strobesFunctionalModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: StrobesFunctionalPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async suppressionDetonatorsModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: SuppressionDetonatorsPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async doorMonitorModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: DoorMonitorPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async suppressionCylinderModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: SuppressionCylinderPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  async autoManualSwitchModal(certID) {
    console.log('Service Certificate ID: ' + certID);
    const modal = await this.modalController.create({
      component: AutoManualSwitchPage,
      componentProps: {
        cert: certID
      }
    });
    await modal.present();
  }

  signOffEvent(ev) {
    console.log(ev);
    if (ev.detail.checked) {
      this.signOff = true;
    } else {
      this.signOff = false;
    }
  }

  processServiceCard() {
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      console.log(this.service);

      if (this.service.log_book_analysis_1_1) {
        this.logBook = this.service.log_book_analysis_1_1;
      } else {
        this.logBook = '';
      }
      if (this.service.event_archive_1_2) {
        this.eventArchive = this.service.event_archive_1_2;
      } else {
        this.eventArchive = '';
      }
      if (this.service.analogue_values_1_3) {
        this.analogueVal = this.service.analogue_values_1_3;
      } else {
        this.analogueVal = '';
      }
      if (this.service.configuration_check_programming_1_4) {
        this.configCheck = this.service.configuration_check_programming_1_4;
      } else {
        this.configCheck = '';
      }
      if (this.service.disable_device_1_5) {
        this.disableDevice = this.service.disable_device_1_5;
      } else {
        this.disableDevice = '';
      }
      // Point 2
      if (this.service.call_points_2_1) {
        this.callPoints = this.service.call_points_2_1;
      } else {
        this.callPoints = '';
      }

      if (this.service.building_structure_2_2) {
        this.buildStructures = this.service.building_structure_2_2;
      } else {
        this.buildStructures = '';
      }

      // POINT 3
      if (this.service.fire_panel_1) {
        this.firePanel1 = this.service.fire_panel_1;
      } else {
        this.firePanel1 = '';
      }
      if (this.service.fire_panel_2) {
        this.firePanel2 = this.service.fire_panel_2;
      } else {
        this.firePanel2 = '';
      }
      if (this.service.fire_panel_3) {
        this.firePanel3 = this.service.fire_panel_3;
      } else {
        this.firePanel3 = '';
      }
      if (this.service.fire_panel_4) {
        this.firePanel4 = this.service.fire_panel_4;
      } else {
        this.firePanel4 = '';
      }
      if (this.service.fire_panel_5) {
        this.firePanel5 = this.service.fire_panel_5;
      } else {
        this.firePanel5 = '';
      }
      if (this.service.fire_panel_6) {
        this.firePanel6 = this.service.fire_panel_6;
      } else {
        this.firePanel6 = '';
      }
      if (this.service.fire_panel_7) {
        this.firePanel7 = this.service.fire_panel_7;
      } else {
        this.firePanel7 = '';
      }
      if (this.service.fire_panel_8) {
        this.firePanel8 = this.service.fire_panel7;
      } else {
        this.firePanel8 = '';
      }
      if (this.service.fire_panel_9) {
        this.firePanel9 = this.service.fire_panel_9;
      } else {
        this.firePanel9 = '';
      }
      if (this.service.fire_panel_10) {
        this.firePanel10 = this.service.fire_panel_10;
      } else {
        this.firePanel10 = '';
      }
      // POINT 4
      if (this.service.clean_device_1) {
        this.cleanDevice1 = this.service.clean_device_1;
      } else {
        this.cleanDevice1 = '';
      }
      if (this.service.clean_device_2) {
        this.cleanDevice2 = this.service.clean_device_2;
      } else {
        this.cleanDevice2 = '';
      }
      if (this.service.clean_device_3) {
        this.cleanDevice3 = this.service.clean_device_3;
      } else {
        this.cleanDevice3 = '';
      }
      if (this.service.clean_device_4) {
        this.cleanDevice4 = this.service.clean_device_4;
      } else {
        this.cleanDevice4 = '';
      }
      if (this.service.clean_device_5) {
        this.cleanDevice5 = this.service.clean_device_5;
      } else {
        this.cleanDevice5 = '';
      }
      if (this.service.clean_device_6) {
        this.cleanDevice6 = this.service.clean_device_6;
      } else {
        this.cleanDevice6 = '';
      }
      if (this.service.clean_device_7) {
        this.cleanDevice7 = this.service.clean_device_7;
      } else {
        this.cleanDevice7 = '';
      }
      if (this.service.clean_device_8) {
        this.cleanDevice8 = this.service.clean_device_8;
      } else {
        this.cleanDevice8 = '';
      }
      if (this.service.clean_device_9) {
        this.cleanDevice9 = this.service.clean_device_9;
      } else {
        this.cleanDevice9 = '';
      }
      if (this.service.clean_device_10) {
        this.cleanDevice10 = this.service.clean_device_10;
      } else {
        this.cleanDevice10 = '';
      }

      // POINT 5.1
      if (this.service.test_device_single_knock_5_1) {
        this.testDeviceSingleKnock1 = this.service.test_device_single_knock_5_1;
      } else {
        this.testDeviceSingleKnock1 = '';
      }
      if (this.service.test_device_single_knock_5_2) {
        this.testDeviceSingleKnock2 = this.service.test_device_single_knock_5_2;
      } else {
        this.testDeviceSingleKnock2 = '';
      }
      if (this.service.test_device_single_knock_5_3) {
        this.testDeviceSingleKnock3 = this.service.test_device_single_knock_5_3;
      } else {
        this.testDeviceSingleKnock3 = '';
      }
      if (this.service.test_device_single_knock_5_4) {
        this.testDeviceSingleKnock4 = this.service.test_device_single_knock_5_4;
      } else {
        this.testDeviceSingleKnock4 = '';
      }
      if (this.service.test_device_single_knock_5_5) {
        this.testDeviceSingleKnock5 = this.service.test_device_single_knock_5_5;
      } else {
        this.testDeviceSingleKnock5 = '';
      }
      if (this.service.test_device_single_knock_5_6) {
        this.testDeviceSingleKnock6 = this.service.test_device_single_knock_5_6;
      } else {
        this.testDeviceSingleKnock6 = '';
      }
      if (this.service.test_device_single_knock_5_7) {
        this.testDeviceSingleKnock7 = this.service.test_device_single_knock_5_7;
      } else {
        this.testDeviceSingleKnock7 = '';
      }
      if (this.service.test_device_single_knock_5_8) {
        this.testDeviceSingleKnock8 = this.service.test_device_single_knock_5_8;
      } else {
        this.testDeviceSingleKnock8 = '';
      }
      if (this.service.test_device_single_knock_5_9) {
        this.testDeviceSingleKnock9 = this.service.test_device_single_knock_5_9;
      } else {
        this.testDeviceSingleKnock9 = '';
      }
      if (this.service.test_device_single_knock_5_10) {
        this.testDeviceSingleKnock10 = this.service.test_device_single_knock_5_10;
      } else {
        this.testDeviceSingleKnock10 = '';
      }

      // POINT 5.2
      if (this.service.test_sounders_single_knock_5_1) {
        this.testSoundersSingleKnock1 = this.service.test_sounders_single_knock_5_1;
      } else {
        this.testSoundersSingleKnock1 = '';
      }
      if (this.service.test_sounders_single_knock_5_2) {
        this.testSoundersSingleKnock2 = this.service.test_sounders_single_knock_5_2;
      } else {
        this.testSoundersSingleKnock2 = '';
      }
      if (this.service.test_sounders_single_knock_5_3) {
        this.testSoundersSingleKnock3 = this.service.test_sounders_single_knock_5_3;
      } else {
        this.testSoundersSingleKnock3 = '';
      }
      if (this.service.test_sounders_single_knock_5_4) {
        this.testSoundersSingleKnock4 = this.service.test_sounders_single_knock_5_4;
      } else {
        this.testSoundersSingleKnock4 = '';
      }
      if (this.service.test_sounders_single_knock_5_5) {
        this.testSoundersSingleKnock5 = this.service.test_sounders_single_knock_5_5;
      } else {
        this.testSoundersSingleKnock5 = '';
      }
      if (this.service.test_sounders_single_knock_5_6) {
        this.testSoundersSingleKnock6 = this.service.test_sounders_single_knock_5_6;
      } else {
        this.testSoundersSingleKnock6 = '';
      }
      if (this.service.test_sounders_single_knock_5_7) {
        this.testSoundersSingleKnock7 = this.service.test_sounders_single_knock_5_7;
      } else {
        this.testSoundersSingleKnock7 = '';
      }
      if (this.service.test_sounders_single_knock_5_8) {
        this.testSoundersSingleKnock8 = this.service.test_sounders_single_knock_5_8;
      } else {
        this.testSoundersSingleKnock8 = '';
      }
      if (this.service.test_sounders_single_knock_5_9) {
        this.testSoundersSingleKnock9 = this.service.test_sounders_single_knock_5_9;
      } else {
        this.testSoundersSingleKnock9 = '';
      }
      if (this.service.test_sounders_single_knock_5_10) {
        this.testSoundersSingleKnock10 = this.service.test_sounders_single_knock_5_10;
      } else {
        this.testSoundersSingleKnock10 = '';
      }

      // POINT 6
      if (this.service.beam_detection_6_1) {
        this.beamDetection = this.service.beam_detection_6_1;
      } else {
        this.beamDetection = '';
      }
      if (this.service.air_sampling_6_2) {
        this.airSampling = this.service.air_sampling_6_2;
      } else {
        this.airSampling = '';
      }
      if (this.service.liner_heat_6_3) {
        this.linerHeat = this.service.liner_heat_6_3;
      } else {
        this.linerHeat = '';
      }
      if (this.service.flame_detection_6_4) {
        this.flameDetection = this.service.flame_detection_6_4;
      } else {
        this.flameDetection = '';
      }
      if (this.service.wireless_6_5) {
        this.wireless = this.service.wireless_6_5;
      } else {
        this.wireless = '';
      }

      // POINT 7
      if (this.service.stair_pressure_fans_7_1) {
        this.stairPressure = this.service.stair_pressure_fans_7_1;
      } else {
        this.stairPressure = '';
      }
      if (this.service.lift_pressure_fans_7_2) {
        this.liftPressure = this.service.lift_pressure_fans_7_2;
      } else {
        this.liftPressure = '';
      }
      if (this.service.smoke_extraction_fans_7_3) {
        this.smokeExtraction = this.service.smoke_extraction_fans_7_3;
      } else {
        this.smokeExtraction = '';
      }
      if (this.service.smoke_ventilation_louvers_7_4) {
        this.smokeVentiltion = this.service.smoke_ventilation_louvers_7_4;
      } else {
        this.smokeVentiltion = '';
      }
      if (this.service.roller_shutter_doors_7_5) {
        this.rollerShutter = this.service.roller_shutter_doors_7_5;
      } else {
        this.rollerShutter = '';
      }
      if (this.service.fire_doors_7_6) {
        this.fireDoors = this.service.fire_doors_7_6;
      } else {
        this.fireDoors = '';
      }
      if (this.service.escape_door_release_7_7) {
        this.escapeDoorRelease = this.service.escape_door_release_7_7;
      } else {
        this.escapeDoorRelease = '';
      }
      if (this.service.auto_evacuation_7_8) {
        this.autoEvacuation = this.service.auto_evacuation_7_8;
      } else {
        this.autoEvacuation = '';
      }
      if (this.service.auto_remote_signal_7_9) {
        this.autoRemoteSignal = this.service.auto_remote_signal_7_9;
      } else {
        this.autoRemoteSignal = '';
      }
      if (this.service.gas_valves_7_10) {
        this.gasValves = this.service.gas_valves_7_10;
      } else {
        this.gasValves = '';
      }
      if (this.service.gas_valves_7_10) {
        this.gasValves = this.service.gas_valves_7_10;
      } else {
        this.gasValves = '';
      }
      if (this.service.cooker_suppression_7_11) {
        this.cookerSuppression = this.service.cooker_suppression_7_11;
      } else {
        this.cookerSuppression = '';
      }
      if (this.service.lift_homing_7_12) {
        this.liftHoming = this.service.lift_homing_7_12;
      } else {
        this.liftHoming = '';
      }
      if (this.service.ac_shutdown_7_13) {
        this.acShutdown = this.service.ac_shutdown_7_13;
      } else {
        this.acShutdown = '';
      }
      if (this.service.fresh_air_shutdown_7_14) {
        this.freshAir = this.service.fresh_air_shutdown_7_14;
      } else {
        this.freshAir = '';
      }
      if (this.service.other_7_15) {
        this.other7 = this.service.other_7_15;
      } else {
        this.other7 = '';
      }

      // POINT 8
      if (this.service.escape_doors_8_1) {
        this.escapeDoors = this.service.escape_doors_8_1;
      } else {
        this.escapeDoors = '';
      }
      if (this.service.sprinkler_flow_8_2) {
        this.sprinklerFlow = this.service.sprinkler_flow_8_2;
      } else {
        this.sprinklerFlow = '';
      }
      if (this.service.sprinkler_pump_room_8_3) {
        this.sprinklerPumpRoom = this.service.sprinkler_pump_room_8_3;
      } else {
        this.sprinklerPumpRoom = '';
      }
      if (this.service.sump_pump_8_4) {
        this.sumpPump = this.service.sump_pump_8_4;
      } else {
        this.sumpPump = '';
      }
      if (this.service.generator_signals_8_5) {
        this.generatorSignals = this.service.generator_signals_8_5;
      } else {
        this.generatorSignals = '';
      }
      if (this.service.other_8_6) {
        this.other = this.service.other_8_6;
      } else {
        this.other = '';
      }

      // POINT 9
      if (this.service.single_knock_9_1) {
        this.singleKnock = this.service.single_knock_9_1;
      } else {
        this.singleKnock = '';
      }
      if (this.service.double_knock_9_2) {
        this.doubleKnock = this.service.double_knock_9_2;
      } else {
        this.doubleKnock = '';
      }
      if (this.service.fire_bells_9_3) {
        this.fireBells = this.service.fire_bells_9_3;
      } else {
        this.fireBells = '';
      }
      if (this.service.sounders_functional_9_4) {
        this.soundersFunction = this.service.sounders_functional_9_4;
      } else {
        this.soundersFunction = '';
      }
      if (this.service.strobes_functional_9_5) {
        this.strobesFunction = this.service.strobes_functional_9_5;
      } else {
        this.strobesFunction = '';
      }
      if (this.service.suppression_detonator_9_6) {
        this.suppressionDetonators = this.service.suppression_detonator_9_6;
      } else {
        this.suppressionDetonators = '';
      }
      if (this.service.door_monitor_9_7) {
        this.doorMonitor = this.service.door_monitor_9_7;
      } else {
        this.doorMonitor = '';
      }
      if (this.service.suppression_cylinder_9_8) {
        this.suppressionCylinder = this.service.suppression_cylinder_9_8;
      } else {
        this.suppressionCylinder = '';
      }
      if (this.service.manual_switch_9_9) {
        this.manualSwitch = this.service.manual_switch_9_9;
      } else {
        this.manualSwitch = '';
      }
      const serviceStatus = 'Completed';
      // eslint-disable-next-line max-len
      this.updateSC = [this.logBook, this.eventArchive, this.analogueVal, this.configCheck, this.disableDevice,this.callPoints, this.buildStructures,this.firePanel1,this.firePanel2,this.firePanel3,this.firePanel4,this.firePanel5,this.firePanel6,this.firePanel7,this.firePanel8,this.firePanel9,this.firePanel10,this.cleanDevice1,this.cleanDevice2,this.cleanDevice3,this.cleanDevice4,this.cleanDevice5,this.cleanDevice6,this.cleanDevice7,this.cleanDevice8,this.cleanDevice9,this.cleanDevice10,this.testDeviceSingleKnock1,this.testDeviceSingleKnock2,this.testDeviceSingleKnock3,this.testDeviceSingleKnock4,this.testDeviceSingleKnock5,this.testDeviceSingleKnock6,this.testDeviceSingleKnock7,this.testDeviceSingleKnock8,this.testDeviceSingleKnock9,this.testDeviceSingleKnock10,this.testSoundersSingleKnock1,this.testSoundersSingleKnock2,this.testSoundersSingleKnock3,this.testSoundersSingleKnock4,this.testSoundersSingleKnock5,this.testSoundersSingleKnock6,this.testSoundersSingleKnock7,this.testSoundersSingleKnock8,this.testSoundersSingleKnock9,this.testSoundersSingleKnock10,this.beamDetection, this.airSampling,this.linerHeat,this.flameDetection,this.wireless,this.stairPressure, this.liftPressure, this.smokeExtraction, this.smokeVentiltion, this.rollerShutter,this.fireDoors, this.escapeDoorRelease,this.autoEvacuation, this.autoRemoteSignal, this.gasValves, this.cookerSuppression, this.liftHoming, this.acShutdown,this.freshAir,this.other7, this.escapeDoors, this.sprinklerFlow,this.sprinklerPumpRoom, this.sumpPump,this.generatorSignals,this.other, this.singleKnock, this.doubleKnock, this.fireBells, this.soundersFunction,this.strobesFunction,this.suppressionDetonators, this.doorMonitor, this.suppressionCylinder, this.manualSwitch, this.service.client_signature,this.service.company_rep_signature, this.service.date_signed_off, this.service.date_client_signed, this.service.service_comments, this.service.service_company_comments, serviceStatus, this.service.isSync,this.service.date_completed];
      // eslint-disable-next-line max-len
      this.database.executeSql(`UPDATE fire_service_certificates SET log_book_analysis_1_1=?,event_archive_1_2=?, analogue_value_check_1_3=?,configuration_check_programming_1_4=?, disabled_device_check=?,call_points_2_1=?,building_structure_changes_2_2=?,fire_panel_1=?,fire_panel_2=?,fire_panel_3=?,fire_panel_4=?,fire_panel_5=?,fire_panel_6=?,fire_panel_7=?,fire_panel_8=?,fire_panel_9=?,fire_panel_10=?,clean_device_1=?,clean_device_2=?,clean_device_3=?,clean_device_4=?,clean_device_5=?,clean_device_6=?,clean_device_7=?,clean_device_8=?,clean_device_9=?,clean_device_10=?,test_device_single_knock_5_1=?,test_device_single_knock_5_2=?,test_device_single_knock_5_3=?,test_device_single_knock_5_4=?,test_device_single_knock_5_5=?,test_device_single_knock_5_6=?,test_device_single_knock_5_7=?,test_device_single_knock_5_8=?,test_device_single_knock_5_9=?,test_device_single_knock_5_10=?,test_sounders_single_knock_5_1=?,test_sounders_single_knock_5_2=?,test_sounders_single_knock_5_3=?,test_sounders_single_knock_5_4=?,test_sounders_single_knock_5_5=?,test_sounders_single_knock_5_6=?,test_sounders_single_knock_5_7=?,test_sounders_single_knock_5_8=?,test_sounders_single_knock_5_9=?,test_sounders_single_knock_5_10=?,beam_detection_6_1=?,air_sampling_6_2=?,liner_heat_6_3=?,flame_detection_6_4=?,wireless_6_5=?,stair_pressure_fans_7_1=?,lift_pressure_fans_7_2=?,smoke_extraction_fans_7_3=?,smoke_ventilation_louvers_7_4=?,roller_shutter_doors_7_5=?,fire_doors_7_6=?,escape_door_release_7_7=?,auto_evacuation_7_8=?,auto_remote_signal_7_9=?,gas_valves_7_10=?,cooker_suppression_7_11=?,lift_homing_7_12=?,ac_shutdown_7_13=?,fresh_air_shutdown_7_14=?,other_7_15=?,escape_doors_8_1=?,sprinkler_flow_8_2=?, sprinkler_pump_room_8_3=?,sump_pump_8_4=?,generator_signals_8_5=?,other_8_6=?, single_knock_9_1=?,double_knock_9_2=?,fire_bells_9_3=?,sounders_functional_9_4=?,strobes_functional_9_5=?,suppression_detonator_9_6=?,door_monitor_9_7=?,suppression_cylinder_9_8=?,manual_switch_9_9=?,client_signature=?,company_rep_signature=?,date_signed_off=?,date_signed_off_client=?, client_comments=?,service_company_comments=?, service_status=?, isSync=?, date_completed=? WHERE cert_id=${this.certficateID}`, this.updateSC).then((res: any) => {
        console.log('Service Card Updated: ' + JSON.stringify(res));
        this.systemNotification('Service certificate was successfully saved!');
        this.navController.back();
      }, err => {
        console.log('Service Card Error: ' + JSON.stringify(err));
        this.systemNotification('Service certificate could not be saved!');
      });

    }
  }

async systemNotification(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

}
