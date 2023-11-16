import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import * as moment from 'moment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';

@Component({
  selector: 'app-all-service-cards',
  templateUrl: './all-service-cards.page.html',
  styleUrls: ['./all-service-cards.page.scss'],
})
export class AllServiceCardsPage implements OnInit {
  services: any;
  services2: any;
  techID: any;
  url = environment.url;
  networkStatus: any;
  database: SQLiteObject;
  rejection: any;

  panels: any;
  templates: any;
  updateC: any;
  address: any;
  location: any;
  queryP: any;

  module: any;
  fireProtection: any;
  smokeControl: any;
  serviceList: any;
  public tecID: any;
  manageServiceList: any;
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private sqlite: SQLite,
    private networkCheckerService: NetworkCheckerService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private openNativeSettings: OpenNativeSettings,
    private toastController: ToastController,
    private alertController: AlertController
  ) {

   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.createServiceCertificate();
    this.manageCompletedSC();
    this.addServiceTemplates();
    this.updateServiceList();
  }

  ionViewDidEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
    //alert('Condition: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      console.log('We in here: ' + this.networkStatus);
      this.storage.get('currentUser').then((user: any) => {
        //OFFLINE LIST
        this.getOfflineCards2(user.id);
      });
    }
    this.storage.get('currentUser').then((user: any) => {
      this.tecID = user.id;
      this.getOnlineServiceCards(this.tecID);
    });
  }

  async setOnline() {
    await this.openNativeSettings.open('wifi').then((res: any) => {
      console.log('Wifi Settings Openned: ' + res);
      this.presentAlertConfirm();
    }, err => {
      console.log(err);
    });
  }

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Only click "OK" once the wifi message "You are now connected" has displayed.',
    buttons: [
      {
        text: 'Okay',
        handler: () => {
          this.router.navigate(['/auto-sync-sc']);
        }
      }
    ]
  });

  await alert.present();
}

  async flashMessage(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async getOnlineServiceCards(userId) {
    const loading = await this.loadingController.create({message: 'Please wait...'});
    loading.present();
    console.log(userId);
    this.http.get(this.url + 'sp-get-all-service-cards-list.php?techID=' + userId ).subscribe((data: any) => {
      console.log(data);
      this.fireProtection = data?.fireCertificates;
      console.log(this.fireProtection);
      this.smokeControl = data?.smokeCertificates;
      loading.dismiss();
    }, err => {
      loading.dismiss();
      console.log(err);
    });
  }

  updateServiceList() {
    this.storage.get('currentUser').then((user: any) => {
      this.http.get(this.url + 'sp-get-all-service-cards-list.php?techID=' + user.id).subscribe((data: any) => {
        console.log(data);
        this.services = data?.fireCertificates;
        console.log(this.services);
        if (this.services.length > 0) {
          // eslint-disable-next-line guard-for-in, @typescript-eslint/prefer-for-of
          for (let i = 0; i < this.services.length; i++) {
            console.log('Service Certs: ');
            console.log(this.services[i].service_status);
            // eslint-disable-next-line max-len
            if ((this.services[i].service_status === 'Accepted' && this.services[i].tech_status === 'Accepted' && this.services[i].job_approve === 'Approved') || this.services[i].service_status === 'Completed') {
              const isSync = 'No';
              const status = 'Completed';
              console.log(this.services[i].id);
              // eslint-disable-next-line max-len
              this.database.executeSql(`SELECT * FROM fire_sp_service_certificates WHERE cert_id=?`, [this.services[i]?.id]).then((res: any) => {
                if (res.rows.length > 0) {
                  this.updateC = res.rows.item(0);
                  console.log('RESULT Found: '+ JSON.stringify(this.updateC.cert_id));
                  if(this.updateC.rejectionReason) {
                    this.rejection = this.updateC.rejectionReason.replace(/\'/g,"''");
                  } else {
                    this.rejection = '';
                  }
                  const dataUpdate = [this.updateC.client_id, this.updateC.sp_id,this.updateC.service_type_id,
                    this.updateC.site_id, this.updateC.service_technician_id, this.updateC.service_name,
                    this.updateC.service_contract_number,this.updateC.service_certificate_number,
                    this.updateC.service_precheck_1,this.updateC.visual_inspection_2,
                    this.updateC.fire_detection_panel_3,this.updateC.cleaning_devices_4,
                    this.updateC.test_device_loop_5,
                    this.updateC.other_detection_devices_6,
                    this.updateC.other_beam_detection,
                    this.updateC.other_air_sampling,
                    this.updateC.other_liner_heat,
                    this.updateC.other_flame_detection,
                    this.updateC.other_wireless,
                    this.updateC.auxiliary_interface_7,
                    this.updateC.aux_stair_pressure_fans,
                    this.updateC.aux_lift_pressure_fans,
                    this.updateC.aux_smoke_extraction,
                    this.updateC.aux_smoke_ventilation,
                    this.updateC.aux_roller_shutter_doors,
                    this.updateC.aux_fire_door_hold,
                    this.updateC.aux_escape_door_release,
                    this.updateC.aux_auto_evacuation,this.updateC.aux_auto_remote_signal,
                    this.updateC.aux_gas_shutoff_valves,this.updateC.aux_cooker_head_suppression,
                    this.updateC.aux_lift_homing,this.updateC.aux_ac_shutdown,
                    this.updateC.aux_fresh_air_shutdown, this.updateC.aux_other,
                    this.updateC.monitoring_8, this.updateC.mon_escape_doors, this.updateC.mon_sprinkler_flow_switch,
                    this.updateC.mon_spinkler_pump_room, this.updateC.mon_sump_pump,
                    this.updateC.mon_generator_signal,this.updateC.mon_other,this.updateC.gas_suppression_9,
                    this.updateC.service_comments, this.updateC.service_company,this.updateC.saqcc_number,
                    this.updateC.date_service_completed, this.updateC.next_service_date,
                    this.updateC.client_date_accepted,this.updateC.log_book_analysis_1_1,
                    this.updateC.event_archive_1_2,this.updateC.analogue_value_check_1_3,
                    this.updateC.configuration_check_programming_1_4,this.updateC.disabled_device_check,
                    this.updateC.call_points_2_1,this.updateC.building_structure_changes_2_2,
                    this.updateC.fire_detection_alarm_3_1,this.updateC.fire_detection_alarm_3_2,
                    this.updateC.clean_device_panel_4_1,this.updateC.clean_device_panel_4_2,
                    this.updateC.test_device_single_knock_5_1,this.updateC.test_device_single_knock_5_2,
                    this.updateC.test_device_single_knock_5_3,this.updateC.test_device_single_knock_5_4,
                    this.updateC.test_device_single_knock_5_5,this.updateC.test_device_single_knock_5_6,
                    this.updateC.test_device_single_knock_5_7,this.updateC.test_device_single_knock_5_8,
                    this.updateC.test_device_single_knock_5_9,this.updateC.test_device_single_knock_5_10,
                    this.updateC.test_sounders_single_knock_5_1,this.updateC.test_sounders_single_knock_5_2,
                    this.updateC.test_sounders_single_knock_5_3,this.updateC.test_sounders_single_knock_5_4,
                    this.updateC.test_sounders_single_knock_5_5, this.updateC.test_sounders_single_knock_5_6,
                    this.updateC.test_sounders_single_knock_5_7,this.updateC.test_sounders_single_knock_5_8,
                    this.updateC.test_sounders_single_knock_5_9, this.updateC.test_sounders_single_knock_5_10,
                    this.updateC.beam_detection_6_1, this.updateC.air_sampling_6_2, this.updateC.liner_heat_6_3,
                    this.updateC.flame_detection_6_4,this.updateC.wireless_6_5,
                    this.updateC.stair_pressure_fans_7_1, this.updateC.lift_pressure_fans_7_2,
                    this.updateC.smoke_extraction_fans_7_3,this.updateC.smoke_ventilation_louvers_7_4,
                    this.updateC.roller_shutter_doors_7_5, this.updateC.fire_doors_7_6,
                    this.updateC.escape_door_release_7_7, this.updateC.auto_evacuation_7_8,
                    this.updateC.auto_remote_signal_7_9,this.updateC.gas_valves_7_10,
                    this.updateC.cooker_suppression_7_11, this.updateC.lift_homing_7_12,
                    this.updateC.ac_shutdown_7_13, this.updateC.fresh_air_shutdown_7_14,
                    this.updateC.other_7_15, this.updateC.escape_doors_8_1, this.updateC.sprinkler_flow_8_2,
                    this.updateC.sprinkler_pump_room_8_3,this.updateC.sump_pump_8_4,
                    this.updateC.generator_signals_8_5, this.updateC.other_8_6, this.updateC.single_knock_9_1,
                    this.updateC.double_knock_9_2,this.updateC.fire_bells_9_3, this.updateC.sounders_functional_9_4,
                    this.updateC.strobes_functional_9_5, this.updateC.suppression_detonator_9_6,
                    this.updateC.door_monitor_9_7, this.updateC.suppression_cylinder_9_8,
                    this.updateC.manual_switch_9_9, this.updateC.client_comments,
                    this.updateC.service_certificate_comments, this.updateC.date_client_signed,
                    this.updateC.service_company_comments,this.updateC.date_tech_signed, this.updateC.fire_panel_1,
                    this.updateC.fire_panel_2, this.updateC.fire_panel_3,  this.updateC.fire_panel_4,
                    this.updateC.fire_panel_5, this.updateC.fire_panel_6, this.updateC.fire_panel_7,
                    this.updateC.fire_panel_8,
                    this.updateC.fire_panel_9, this.updateC.fire_panel_10, this.updateC.fire_panel_11,
                    this.updateC.fire_panel_12, this.updateC.fire_panel_13,this.updateC.fire_panel_14,
                    this.updateC.fire_panel_15, this.updateC.fire_panel_16,this.updateC.fire_panel_17,
                    this.updateC.fire_panel_18,this.updateC.fire_panel_19,this.updateC.fire_panel_20,
                    this.updateC.fire_panel_21, this.updateC.fire_panel_22,this.updateC.fire_panel_23,
                    this.updateC.fire_panel_24,this.updateC.fire_panel_25, this.updateC.clean_device_1,
                    this.updateC.clean_device_1,this.updateC.clean_device_2,this.updateC.clean_device_3,
                    this.updateC.clean_device_4,this.updateC.clean_device_5,this.updateC.clean_device_6,
                    this.updateC.clean_device_7,this.updateC.clean_device_8,this.updateC.clean_device_9,
                    this.updateC.clean_device_10,this.updateC.clean_device_11,this.updateC.clean_device_12,
                    this.updateC.clean_device_13,this.updateC.clean_device_14,this.updateC.clean_device_15,
                    this.updateC.clean_device_16,this.updateC.clean_device_17,this.updateC.clean_device_18,
                    this.updateC.clean_device_19,this.updateC.clean_device_20,this.updateC.clean_device_21,
                    this.updateC.clean_device_22,this.updateC.clean_device_23,this.updateC.clean_device_24,
                    this.updateC.clean_device_25,this.updateC.client_signature,this.updateC.company_rep_signature,
                    this.updateC.tech_status,this.updateC.service_status,this.updateC.job_approve,
                    this.updateC.service_date_1,this.updateC.service_date_1_to,this.updateC.service_date_2,
                    this.updateC.service_date_2_to,this.updateC.service_date_3,this.updateC.service_date_3_to,
                    this.updateC.final_service_date,this.updateC.service_time,this.updateC.certificateResponse,
                    this.rejection,this.updateC.email_reminder_date,
                    this.updateC.isSignOff,
                    this.updateC.report_sent,this.updateC.report_date,this.updateC.date_signed_off_client,
                    this.updateC.date_signed_off,this.updateC.date_assigned,this.updateC.date_accepted,
                    this.updateC.date_completed,this.updateC.service_card_created, this.updateC?.client_company_name];
                  this.database.executeSql(`UPDATE fire_sp_service_certificates SET client_id=?, sp_id=?,
                  service_type_id=?, site_id=?, service_technician_id=?, service_name=?,
                  service_contract_number=?, service_certificate_number=?,service_precheck_1=?, visual_inspection_2=?,
                  fire_detection_panel_3=?, cleaning_devices_4=?,test_device_loop_5=?,
                  other_detection_devices_6=?,
                  other_beam_detection=?,
                  other_air_sampling=?,
                  other_liner_heat=?,
                  other_flame_detection=?,
                  other_wireless=?,
                  auxiliary_interface_7=?,
                  aux_stair_pressure_fans=?,
                  aux_lift_pressure_fans=?,
                  aux_smoke_extraction=?,
                  aux_smoke_ventilation=?,
                  aux_roller_shutter_doors=?,
                  aux_fire_door_hold=?,
                  aux_escape_door_release=?,
                  aux_auto_evacuation=?,
                  aux_auto_remote_signal=?,
                  aux_gas_shutoff_valves=?,
                  aux_cooker_head_suppression=?,
                  aux_lift_homing=?,
                  aux_ac_shutdown=?,
                  aux_fresh_air_shutdown=?,
                  aux_other=?,
                  monitoring_8=?, mon_escape_doors=?, mon_sprinkler_flow_switch=?, mon_spinkler_pump_room=?,
                  mon_sump_pump=?, mon_generator_signal=?, mon_other=?, gas_suppression_9=?,
                  service_comments=?, service_company=?, saqcc_number=?, date_service_completed=?,
                  next_service_date=?, client_date_accepted=?, log_book_analysis_1_1=?, event_archive_1_2=?,
                  analogue_value_check_1_3=?, configuration_check_programming_1_4=?, disabled_device_check=?, call_points_2_1=?,
                  building_structure_changes_2_2=?, fire_detection_alarm_3_1=?, fire_detection_alarm_3_2=?, clean_device_panel_4_1=?,
                  clean_device_panel_4_2=?, test_device_single_knock_5_1=?, test_device_single_knock_5_2=?, test_device_single_knock_5_3=?,
                  test_device_single_knock_5_4=?, test_device_single_knock_5_5=?, test_device_single_knock_5_6=?,
                  test_device_single_knock_5_7=?,
                  test_device_single_knock_5_8=?, test_device_single_knock_5_9=?, test_device_single_knock_5_10=?,
                  test_sounders_single_knock_5_1=?,test_sounders_single_knock_5_2=?, test_sounders_single_knock_5_3=?,
                  test_sounders_single_knock_5_4=?, test_sounders_single_knock_5_5=?,
                  test_sounders_single_knock_5_6=?, test_sounders_single_knock_5_7=?,
                  test_sounders_single_knock_5_8=?, test_sounders_single_knock_5_9=?,
                  test_sounders_single_knock_5_10=?, beam_detection_6_1=?,
                  air_sampling_6_2=?, liner_heat_6_3=?, flame_detection_6_4=?, wireless_6_5=?,
                  stair_pressure_fans_7_1=?, lift_pressure_fans_7_2=?, smoke_extraction_fans_7_3=?, smoke_ventilation_louvers_7_4=?,
                  roller_shutter_doors_7_5=?, fire_doors_7_6=?, escape_door_release_7_7=?, auto_evacuation_7_8=?,
                  auto_remote_signal_7_9=?, gas_valves_7_10=?, cooker_suppression_7_11=?, lift_homing_7_12=?,
                  ac_shutdown_7_13=?, fresh_air_shutdown_7_14=?, other_7_15=?, escape_doors_8_1=?,
                  sprinkler_flow_8_2=?, sprinkler_pump_room_8_3=?, sump_pump_8_4=?, generator_signals_8_5=?,
                  other_8_6=?, single_knock_9_1=?, double_knock_9_2=?, fire_bells_9_3=?,
                  sounders_functional_9_4=?, strobes_functional_9_5=?, suppression_detonator_9_6=?, door_monitor_9_7=?,
                  suppression_cylinder_9_8=?, manual_switch_9_9=?, client_comments=?, service_certificate_comments=?,
                  date_client_signed=?, service_company_comments=?, date_tech_signed=?, fire_panel_1=?,
                  fire_panel_2=?, fire_panel_3=?, fire_panel_4=?, fire_panel_5=?,
                  fire_panel_6=?, fire_panel_7=?, fire_panel_8=?, fire_panel_9=?,
                  fire_panel_10=?, fire_panel_11=?, fire_panel_12=?, fire_panel_13=?,
                  fire_panel_14=?, fire_panel_15=?, fire_panel_16=?, fire_panel_17=?,
                  fire_panel_18=?, fire_panel_19=?, fire_panel_20=?, fire_panel_21=?,
                  fire_panel_22=?, fire_panel_23=?, fire_panel_24=?, fire_panel_25=?,
                  clean_device_1=?, clean_device_2=?, clean_device_3=?, clean_device_4=?,
                  clean_device_5=?, clean_device_6=?, clean_device_7=?, clean_device_8=?,
                  clean_device_9=?, clean_device_10=?, clean_device_11=?, clean_device_12=?,
                  clean_device_13=?, clean_device_14=?, clean_device_15=?, clean_device_16=?,
                  clean_device_17=?, clean_device_18=?, clean_device_19=?, clean_device_20=?,
                  clean_device_21=?, clean_device_22=?, clean_device_23=?, clean_device_24=?,
                  clean_device_25=?, client_signature=?, company_rep_signature=?,tech_status=?, service_status=?,
                  job_approve=?, arrival_time=?, service_date_1=?, service_date_1_to=?,
                  service_date_2=?, service_date_2_to=?, service_date_3=?, service_date_3_to=?,
                  final_service_date=?, service_time=?, certificateResponse=?, rejectionReason=?,
                  email_reminder_date=?, isSignOff=?, report_sent=?, report_date=?,
                  date_signed_off_client=?, date_signed_off=?, date_assigned=?, date_accepted=?,
                  date_completed=?, service_card_created=?, client_company_name=?
                  WHERE cert_id= ${this.updateC.id}`, dataUpdate).then((certUpdate: any) => {
                    console.log('Service Card UPDATED: ' + JSON.stringify(certUpdate));
                  }, err => {
                    console.log('UPDATE FAIL: ' + JSON.stringify(err));
                  });
                  console.log('Cert exists local db....');
                } else {
                  //New Certificate
                  if(this.services[i]?.rejectionReason) {
                    this.rejection = this.services[i]?.rejectionReason.replace(/\'/g,"''");
                  } else {
                    this.rejection = '';
                  }
                  console.log('New Service Certificate: Added');
                  console.log(this.services);
                  //this.serviceList = this.services?.fireCertificates;
                  this.serviceList = this.services;
                  console.log(this.serviceList);
                  // eslint-disable-next-line max-len
                  const certInsert = `INSERT INTO fire_sp_service_certificates (cert_id,client_id, sp_id, service_type_id, site_id, service_technician_id, service_name,service_contract_number, service_certificate_number,service_precheck_1, visual_inspection_2,fire_detection_panel_3, cleaning_devices_4,test_device_loop_5, other_detection_devices_6, other_beam_detection, other_air_sampling, other_liner_heat, other_flame_detection, other_wireless, auxiliary_interface_7, aux_stair_pressure_fans, aux_lift_pressure_fans, aux_smoke_extraction,aux_smoke_ventilation, aux_roller_shutter_doors,aux_fire_door_hold, aux_escape_door_release,aux_auto_evacuation, aux_auto_remote_signal,aux_gas_shutoff_valves, aux_cooker_head_suppression,aux_lift_homing, aux_ac_shutdown,aux_fresh_air_shutdown, aux_other,monitoring_8, mon_escape_doors, mon_sprinkler_flow_switch, mon_spinkler_pump_room,mon_sump_pump, mon_generator_signal, mon_other, gas_suppression_9,service_comments, service_company, saqcc_number, date_service_completed,next_service_date, client_date_accepted, log_book_analysis_1_1, event_archive_1_2,analogue_value_check_1_3, configuration_check_programming_1_4, disabled_device_check, call_points_2_1,building_structure_changes_2_2, fire_detection_alarm_3_1, fire_detection_alarm_3_2, clean_device_panel_4_1,clean_device_panel_4_2, test_device_single_knock_5_1, test_device_single_knock_5_2, test_device_single_knock_5_3,test_device_single_knock_5_4, test_device_single_knock_5_5, test_device_single_knock_5_6, test_device_single_knock_5_7,test_device_single_knock_5_8, test_device_single_knock_5_9, test_device_single_knock_5_10, test_sounders_single_knock_5_1,test_sounders_single_knock_5_2, test_sounders_single_knock_5_3,test_sounders_single_knock_5_4, test_sounders_single_knock_5_5,test_sounders_single_knock_5_6, test_sounders_single_knock_5_7,test_sounders_single_knock_5_8, test_sounders_single_knock_5_9,test_sounders_single_knock_5_10, beam_detection_6_1,air_sampling_6_2, liner_heat_6_3, flame_detection_6_4, wireless_6_5,stair_pressure_fans_7_1, lift_pressure_fans_7_2, smoke_extraction_fans_7_3, smoke_ventilation_louvers_7_4,roller_shutter_doors_7_5, fire_doors_7_6, escape_door_release_7_7, auto_evacuation_7_8,auto_remote_signal_7_9, gas_valves_7_10, cooker_suppression_7_11, lift_homing_7_12,ac_shutdown_7_13, fresh_air_shutdown_7_14, other_7_15, escape_doors_8_1,sprinkler_flow_8_2, sprinkler_pump_room_8_3, sump_pump_8_4, generator_signals_8_5,other_8_6, single_knock_9_1, double_knock_9_2, fire_bells_9_3,sounders_functional_9_4, strobes_functional_9_5, suppression_detonator_9_6, door_monitor_9_7,suppression_cylinder_9_8, manual_switch_9_9, client_comments, service_certificate_comments,date_client_signed, service_company_comments, date_tech_signed, fire_panel_1,fire_panel_2, fire_panel_3, fire_panel_4, fire_panel_5,fire_panel_6, fire_panel_7, fire_panel_8, fire_panel_9,fire_panel_10, fire_panel_11, fire_panel_12, fire_panel_13,fire_panel_14, fire_panel_15, fire_panel_16, fire_panel_17,fire_panel_18, fire_panel_19, fire_panel_20, fire_panel_21,fire_panel_22, fire_panel_23, fire_panel_24, fire_panel_25,clean_device_1, clean_device_2, clean_device_3, clean_device_4,clean_device_5, clean_device_6, clean_device_7, clean_device_8,clean_device_9, clean_device_10, clean_device_11, clean_device_12,clean_device_13, clean_device_14, clean_device_15, clean_device_16,clean_device_17, clean_device_18, clean_device_19, clean_device_20,clean_device_21, clean_device_22, clean_device_23, clean_device_24,clean_device_25, client_signature, company_rep_signature,tech_status, service_status,job_approve, arrival_time, service_date_1, service_date_1_to,service_date_2, service_date_2_to, service_date_3, service_date_3_to,final_service_date, service_time, certificateResponse, rejectionReason,email_reminder_date, isSignOff, report_sent, report_date,date_signed_off_client, date_signed_off, date_assigned, date_accepted,date_completed, service_card_created, client_company_name)
                    VALUES ('${this.serviceList[i]?.id}',
                    '${this.serviceList[i]?.client_id}',
                    '${this.serviceList[i]?.sp_id}',
                    '${this.serviceList[i]?.service_type_id}',
                    '${this.serviceList[i]?.site_id}',
                    '${this.serviceList[i]?.service_technician_id}',
                    '${this.serviceList[i]?.service_name}',
                    '${this.serviceList[i]?.service_contract_number}',
                    '${this.serviceList[i]?.service_certificate_number}',
                    '${this.serviceList[i]?.service_precheck_1}',
                    '${this.serviceList[i]?.visual_inspection_2}',
                    '${this.serviceList[i]?.fire_detection_panel_3}',
                    '${this.serviceList[i]?.cleaning_devices_4}',
                    '${this.serviceList[i]?.test_device_loop_5}',
                    '${this.serviceList[i]?.other_detection_devices_6}',
                    '${this.serviceList[i]?.other_beam_detection}',
                    '${this.serviceList[i]?.other_air_sampling}',
                    '${this.serviceList[i]?.other_liner_heat}',
                    '${this.serviceList[i]?.other_flame_detection}',
                    '${this.serviceList[i]?.other_wireless}',
                    '${this.serviceList[i]?.auxiliary_interface_7}',
                    '${this.serviceList[i]?.aux_stair_pressure_fans}',
                    '${this.serviceList[i]?.aux_lift_pressure_fans}',
                    '${this.serviceList[i]?.aux_smoke_extraction}',
                    '${this.serviceList[i]?.aux_smoke_ventilation}',
                    '${this.serviceList[i]?.aux_roller_shutter_doors}',
                    '${this.serviceList[i]?.aux_fire_door_hold}',
                    '${this.serviceList[i]?.aux_escape_door_release}',
                    '${this.serviceList[i]?.aux_auto_evacuation}',
                    '${this.serviceList[i]?.aux_auto_remote_signal}',
                    '${this.serviceList[i]?.aux_gas_shutoff_valves}',
                    '${this.serviceList[i]?.aux_cooker_head_suppression}',
                    '${this.serviceList[i]?.aux_lift_homing}',
                    '${this.serviceList[i]?.aux_ac_shutdown}',
                    '${this.serviceList[i]?.aux_fresh_air_shutdown}',
                    '${this.serviceList[i]?.aux_other}',
                    '${this.serviceList[i]?.monitoring_8}',
                    '${this.serviceList[i]?.mon_escape_doors}',
                    '${this.serviceList[i]?.mon_sprinkler_flow_switch}',
                    '${this.serviceList[i]?.mon_spinkler_pump_room}',
                    '${this.serviceList[i]?.mon_sump_pump}',
                    '${this.serviceList[i]?.mon_generator_signal}',
                    '${this.serviceList[i]?.mon_other}',
                    '${this.serviceList[i]?.gas_suppression_9}',
                    '${this.serviceList[i]?.service_comments}',
                    '${this.serviceList[i]?.service_company}',
                    '${this.serviceList[i]?.saqcc_number}',
                    '${this.serviceList[i]?.date_service_completed}',
                    '${this.serviceList[i]?.next_service_date}',
                    '${this.serviceList[i]?.client_date_accepted}',
                    '${this.serviceList[i]?.log_book_analysis_1_1}',
                    '${this.serviceList[i]?.event_archive_1_2}',
                    '${this.serviceList[i]?.analogue_value_check_1_3}',
                    '${this.serviceList[i]?.configuration_check_programming_1_4}',
                    '${this.serviceList[i]?.disabled_device_check}',
                    '${this.serviceList[i]?.call_points_2_1}',
                    '${this.serviceList[i]?.building_structure_changes_2_2}',
                    '${this.serviceList[i]?.fire_detection_alarm_3_1}',
                    '${this.serviceList[i]?.fire_detection_alarm_3_2}',
                    '${this.serviceList[i]?.clean_device_panel_4_1}',
                    '${this.serviceList[i]?.clean_device_panel_4_2}',
                    '${this.serviceList[i]?.test_device_single_knock_5_1}',
                    '${this.serviceList[i]?.test_device_single_knock_5_2}',
                    '${this.serviceList[i]?.test_device_single_knock_5_3}',
                    '${this.serviceList[i]?.test_device_single_knock_5_4}',
                    '${this.serviceList[i]?.test_device_single_knock_5_5}',
                    '${this.serviceList[i]?.test_device_single_knock_5_6}',
                    '${this.serviceList[i]?.test_device_single_knock_5_7}',
                    '${this.serviceList[i]?.test_device_single_knock_5_8}',
                    '${this.serviceList[i]?.test_device_single_knock_5_9}',
                    '${this.serviceList[i]?.test_device_single_knock_5_10}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_1}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_2}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_3}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_4}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_5}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_6}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_7}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_8}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_9}',
                    '${this.serviceList[i]?.test_sounders_single_knock_5_10}',
                    '${this.serviceList[i]?.beam_detection_6_1}',
                    '${this.serviceList[i]?.air_sampling_6_2}',
                    '${this.serviceList[i]?.liner_heat_6_3}',
                    '${this.serviceList[i]?.flame_detection_6_4}',
                    '${this.serviceList[i]?.wireless_6_5}',
                    '${this.serviceList[i]?.stair_pressure_fans_7_1}',
                    '${this.serviceList[i]?.lift_pressure_fans_7_2}',
                    '${this.serviceList[i]?.smoke_extraction_fans_7_3}',
                    '${this.serviceList[i]?.smoke_ventilation_louvers_7_4}',
                    '${this.serviceList[i]?.roller_shutter_doors_7_5}',
                    '${this.serviceList[i]?.fire_doors_7_6}',
                    '${this.serviceList[i]?.escape_door_release_7_7}',
                    '${this.serviceList[i]?.auto_evacuation_7_8}',
                    '${this.serviceList[i]?.auto_remote_signal_7_9}',
                    '${this.serviceList[i]?.gas_valves_7_10}',
                    '${this.serviceList[i]?.cooker_suppression_7_11}',
                    '${this.serviceList[i]?.lift_homing_7_12}',
                    '${this.serviceList[i]?.ac_shutdown_7_13}',
                    '${this.serviceList[i]?.fresh_air_shutdown_7_14}',
                    '${this.serviceList[i]?.other_7_15}',
                    '${this.serviceList[i]?.escape_doors_8_1}',
                    '${this.serviceList[i]?.sprinkler_flow_8_2}',
                    '${this.serviceList[i]?.sprinkler_pump_room_8_3}',
                    '${this.serviceList[i]?.sump_pump_8_4}',
                    '${this.serviceList[i]?.generator_signals_8_5}',
                    '${this.serviceList[i]?.other_8_6}',
                    '${this.serviceList[i]?.single_knock_9_1}',
                    '${this.serviceList[i]?.double_knock_9_2}',
                    '${this.serviceList[i]?.fire_bells_9_3}',
                    '${this.serviceList[i]?.sounders_functional_9_4}',
                    '${this.serviceList[i]?.strobes_functional_9_5}',
                    '${this.serviceList[i]?.suppression_detonator_9_6}',
                    '${this.serviceList[i]?.door_monitor_9_7}',
                    '${this.serviceList[i]?.suppression_cylinder_9_8}',
                    '${this.serviceList[i]?.manual_switch_9_9}',
                    '${this.serviceList[i]?.client_comments}',
                    '${this.serviceList[i]?.service_certificate_comments}',
                    '${this.serviceList[i]?.date_client_signed}',
                    '${this.serviceList[i]?.service_company_comments}',
                    '${this.serviceList[i]?.date_tech_signed}',
                    '${this.serviceList[i]?.fire_panel_1}',
                    '${this.serviceList[i]?.fire_panel_2}',
                    '${this.serviceList[i]?.fire_panel_3}',
                    '${this.serviceList[i]?.fire_panel_4}',
                    '${this.serviceList[i]?.fire_panel_5}',
                    '${this.serviceList[i]?.fire_panel_6}',
                    '${this.serviceList[i]?.fire_panel_7}',
                    '${this.serviceList[i]?.fire_panel_8}',
                    '${this.serviceList[i]?.fire_panel_9}',
                    '${this.serviceList[i]?.fire_panel_10}',
                    '${this.serviceList[i]?.fire_panel_11}',
                    '${this.serviceList[i]?.fire_panel_12}',
                    '${this.serviceList[i]?.fire_panel_13}',
                    '${this.serviceList[i]?.fire_panel_14}',
                    '${this.serviceList[i]?.fire_panel_15}',
                    '${this.serviceList[i]?.fire_panel_16}',
                    '${this.serviceList[i]?.fire_panel_17}',
                    '${this.serviceList[i]?.fire_panel_18}',
                    '${this.serviceList[i]?.fire_panel_19}',
                    '${this.serviceList[i]?.fire_panel_20}',
                    '${this.serviceList[i]?.fire_panel_21}',
                    '${this.serviceList[i]?.fire_panel_22}',
                    '${this.serviceList[i]?.fire_panel_23}',
                    '${this.serviceList[i]?.fire_panel_24}',
                    '${this.serviceList[i]?.fire_panel_25}',
                    '${this.serviceList[i]?.clean_device_1}',
                    '${this.serviceList[i]?.clean_device_2}',
                    '${this.serviceList[i]?.clean_device_3}',
                    '${this.serviceList[i]?.clean_device_4}',
                    '${this.serviceList[i]?.clean_device_5}',
                    '${this.serviceList[i]?.clean_device_6}',
                    '${this.serviceList[i]?.clean_device_7}',
                    '${this.serviceList[i]?.clean_device_8}',
                    '${this.serviceList[i]?.clean_device_9}',
                    '${this.serviceList[i]?.clean_device_10}',
                    '${this.serviceList[i]?.clean_device_11}',
                    '${this.serviceList[i]?.clean_device_12}',
                    '${this.serviceList[i]?.clean_device_13}',
                    '${this.serviceList[i]?.clean_device_14}',
                    '${this.serviceList[i]?.clean_device_15}',
                    '${this.serviceList[i]?.clean_device_16}',
                    '${this.serviceList[i]?.clean_device_17}',
                    '${this.serviceList[i]?.clean_device_18}',
                    '${this.serviceList[i]?.clean_device_19}',
                    '${this.serviceList[i]?.clean_device_20}',
                    '${this.serviceList[i]?.clean_device_21}',
                    '${this.serviceList[i]?.clean_device_22}',
                    '${this.serviceList[i]?.clean_device_23}',
                    '${this.serviceList[i]?.clean_device_24}',
                    '${this.serviceList[i]?.clean_device_25}',
                    '${this.serviceList[i]?.client_signature}',
                    '${this.serviceList[i]?.company_rep_signature}',
                    '${this.serviceList[i]?.tech_status}',
                    '${this.serviceList[i]?.service_status}',
                    '${this.serviceList[i]?.job_approve}',
                    '${this.serviceList[i]?.arrival_time}',
                    '${this.serviceList[i]?.service_date_1}',
                    '${this.serviceList[i]?.service_date_1_to}',
                    '${this.serviceList[i]?.service_date_2}',
                    '${this.serviceList[i]?.service_date_2_to}',
                    '${this.serviceList[i]?.service_date_3}',
                    '${this.serviceList[i]?.service_date_3_to}',
                    '${this.serviceList[i]?.final_service_date}',
                    '${this.serviceList[i]?.service_time}',
                    '${this.serviceList[i]?.certificateResponse}',
                    '${this.rejection}',
                    '${this.serviceList[i]?.email_reminder_date}',
                    '${this.serviceList[i]?.isSignOff}',
                    '${this.serviceList[i]?.report_sent}',
                    '${this.serviceList[i]?.report_date}',
                    '${this.serviceList[i]?.date_signed_off_client}',
                    '${this.serviceList[i]?.date_signed_off}',
                    '${this.serviceList[i]?.date_assigned}',
                    '${this.serviceList[i]?.date_accepted}',
                    '${this.serviceList[i]?.date_completed}',
                    '${this.serviceList[i]?.service_card_created}','${this.serviceList[i]?.client_company_name}'
                    )`;
                  this.database.executeSql(certInsert, []).then((cert: any) => {
                    console.log('Service Card Added: ' + JSON.stringify(cert));
                  }, err => {
                    console.log('Service Card Failed to add');
                  });
                }
              });
            } else {

            }
          } // Loop END HERE
        }
      });
    });
  }

  getOfflineJobCards() {
    const offData = [];
    console.log('Offline: ' + this.techID);
  // eslint-disable-next-line max-len
  const querySC = 'SELECT *, fire_sp_service_certificates.cert_id as id, service_status as cert_status FROM fire_sp_service_certificates JOIN fire_sp_sites ON fire_sp_service_certificates.site_id = fire_sp_sites.site_id';
    this.database.executeSql(querySC, []).then((res: any) => {
      if (res.rows.length > 0) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let i=0; i < res.rows.length; i++) {
           offData.push(res.rows.item(i));
        }
        console.log(offData);
        this.fireProtection = offData;
      } else {
        console.log('There is no service cards');
      }
    });
  }

  getSites() {
    const offData = [];
    const querySC = 'SELECT * FROM fire_sp_sites';
    this.database.executeSql(querySC).then((rec: any) => {
      if (rec.rows.length > 0) {
        for(let i=0; i < rec.rows.length; i++) {
          offData.push(rec.rows.item(i));
          console.log(rec.rows.item(i));
       }
       console.log(offData);
      }
    }, err => {
      console.log(err);
    });
  }

  async getOfflineCards2(techID) {
    const loading = await this.loadingController.create({ message: 'Please wait...' });
    loading.present();
    const offData = [];
    console.log('Offline: ' + techID);
  // eslint-disable-next-line max-len
  const querySC = 'SELECT *, fire_sp_service_certificates.cert_id as id, service_status as cert_status FROM fire_sp_service_certificates JOIN fire_sp_sites ON fire_sp_service_certificates.site_id = fire_sp_sites.site_id WHERE fire_sp_service_certificates.service_technician_id=?';
    this.database.executeSql(querySC, [techID]).then((res: any) => {
      if (res.rows.length > 0) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let i=0; i < res.rows.length; i++) {
          offData.push(res.rows.item(i));
        }
        //alert(JSON.stringify(offData));
        this.fireProtection = offData;
        loading.dismiss();
      } else {
        console.log('There is no service cards');
        loading.dismiss();
      }
    }, err => {
      loading.dismiss();
      console.log(err);
    });
  }


  manageCompletedSC() {
    this.storage.get('currentUser').then((user: any) => {
      const techID = user.id;
      console.log('Tech ID: ' + techID);
      const offData = [];
      // eslint-disable-next-line max-len
      const querySC = 'SELECT *, fire_sp_service_certificates.cert_id as id, service_status as cert_status FROM fire_sp_service_certificates JOIN fire_sp_sites ON fire_sp_service_certificates.site_id = fire_sp_sites.site_id  WHERE fire_sp_service_certificates.service_technician_id=?';
      this.database.executeSql(querySC,[techID]).then((rec: any) => {
        if (rec.rows.length > 0) {
          for(let i=0; i < rec.rows.length; i++) {
            offData.push(rec.rows.item(i));
         }
         this.manageServiceList = offData;
         console.log(this.manageServiceList);
         // eslint-disable-next-line @typescript-eslint/prefer-for-of
         for(let d=0; d < this.manageServiceList.length; d++) {
          const status = this.manageServiceList[d].service_status;
          const removeDate = moment(this.manageServiceList[d].date_completed).add(7, 'days').format('YYYY-MM-D');
          const currentDate = moment().format('YYYY-MM-D');
            if (currentDate > removeDate && status === 'Completed') {
              // console.log(this.services[d]);
              this.database.executeSql(`DELETE FROM fire_sp_service_certificates WHERE cert_id=?`, [this.manageServiceList[d].cert_id])
              .then((del: any) => {
                //console.log('Record Deleted: ' + JSON.stringify(del));
              });
            }
         }
        }
      });
    });
  }

  //SERVICE TYPE TEMPLATES
  addServiceTemplates() {
    this.http.get(this.url + 'sp-all-service-templates.php').subscribe((res: any) => {
      this.templates = res;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0; i < res.length; i++) {
        //console.log(res[i].id);
        const recID = res[i].id;
        const queryS1 = 'SELECT * FROM fire_sp_service_type_templates WHERE template_id=?';
        this.database.executeSql(queryS1 ,[recID])
        .then((temp: any) => {
          //console.log('Records: ' + temp.rows.length);
          if (temp.rows.length > 0) {
            //console.log('Template exists local db....');
            const type = temp.rows.item(0);
            this.location = type.site_location.replace(/\'/g,"''");
            this.address = type.site_address.replace(/\'/g,"''");
            const updateTemp = [type.sp_id, type.site_id, type.client_id,
            type.service_type,type.service,type.site_contract,
            type.site_name.replace(/\'/g,"''"),this.location, this.address,
            type.site_leader,type.site_contact_number,type.protected_areas,
            type.responsible_person,type.responsible_email,type.system_category,
            type.system_code, type.type_of_system,type.service_contract_number,
            type.service_precheck_1,
            type.visual_inspection_2,
            type.fire_detection_panel_3,
            type.cleaning_devices_4,
            type.test_device_loop_5,
            type.other_detection_devices_6,
            type.other_beam_detection,
            type.other_air_sampling,
            type.other_liner_heat,
            type.other_flame_detection,
            type.other_wireless,
            type.auxiliary_interface_7,
            type.aux_stair_pressure_fans, type.aux_lift_pressure_fans,
            type.aux_smoke_extraction, type.aux_smoke_ventilation,
            type.aux_roller_shutter_doors, type.aux_fire_door_hold,
            type.aux_escape_door_release,type.aux_auto_evacuation,
            type.aux_auto_remote_signal, type.aux_gas_shutoff_valves,
            type.aux_cooker_head_suppression, type.aux_lift_homing,type.aux_ac_shutdown,
            type.aux_fresh_air_shutdown,type.aux_other, type.monitoring_8,
            type.mon_escape_doors, type.mon_sprinkler_flow_switch,
            type.mon_spinkler_pump_room,type.mon_sump_pump,type.mon_generator_signal,
            type.mon_other,type.gas_suppression_9,type.isCertificate,
            type.isDisabled,type.service_reminder_date, type.service_reminder_date_to,
            type.certificate_date_created,type.date_created];

            // eslint-disable-next-line max-len
            this.database.executeSql(`UPDATE fire_sp_service_type_templates  SET sp_id=?,site_id=?, client_id=?,service_type=?, service=?,site_contract=?, site_name=?, site_location=?, site_address=?,site_leader=?, site_contact_number=?,protected_areas=?, responsible_person=?,responsible_email=?,system_category=?,system_code=?, type_of_system=?,service_contract_number=?, service_precheck_1=?,visual_inspection_2=?, fire_detection_panel_3=?, cleaning_devices_4=?,test_device_loop_5=?, other_detection_devices_6=?, other_beam_detection=?, other_air_sampling=?, other_liner_heat=?, other_flame_detection=?, other_wireless=?, auxiliary_interface_7=?,aux_stair_pressure_fans=?, aux_lift_pressure_fans=?, aux_smoke_extraction=?,aux_smoke_ventilation=?, aux_roller_shutter_doors=?, aux_fire_door_hold=?,aux_escape_door_release=?,  aux_auto_evacuation=?,  aux_auto_remote_signal=?,aux_gas_shutoff_valves=?, aux_cooker_head_suppression=?, aux_lift_homing=?,aux_ac_shutdown=?, aux_fresh_air_shutdown=?,  aux_other=?,  monitoring_8=?,mon_escape_doors=?,  mon_sprinkler_flow_switch=?,  mon_spinkler_pump_room=?,mon_sump_pump=?,  mon_generator_signal=?,  mon_other=?,gas_suppression_9=?, isCertificate=?,  isDisabled=?,service_reminder_date=?, service_reminder_date_to=?, certificate_date_created=?,date_created=? WHERE template_id=${type.template_id}`, updateTemp)
            .then((update: any) => {
              // console.log('TEMPLATE UPDATED: ' + JSON.stringify(update));
            }, err => {
              // console.log('Template UPDATE Error: ' + JSON.stringify(err));
            });
          } else {
            console.log('New Template LocalDB....');
            this.templates = res[i];
            this.location = this.templates.site_location;
            this.address = this.templates.site_address;
            // eslint-disable-next-line max-len
            const addTemplate = `INSERT INTO fire_sp_service_type_templates (template_id, sp_id, site_id, client_id, service_type, service, site_contract, site_name,site_location, site_address, site_leader, site_contact_number,protected_areas, responsible_person, responsible_email,system_category,system_code, type_of_system, service_contract_number, service_precheck_1,visual_inspection_2, fire_detection_panel_3, cleaning_devices_4, test_device_loop_5, other_detection_devices_6, other_beam_detection, other_air_sampling, other_liner_heat, other_flame_detection, other_wireless, auxiliary_interface_7, aux_stair_pressure_fans, aux_lift_pressure_fans, aux_smoke_extraction, aux_smoke_ventilation, aux_roller_shutter_doors, aux_fire_door_hold, aux_escape_door_release,  aux_auto_evacuation,  aux_auto_remote_signal, aux_gas_shutoff_valves, aux_cooker_head_suppression, aux_lift_homing, aux_ac_shutdown, aux_fresh_air_shutdown,  aux_other,  monitoring_8, mon_escape_doors,  mon_sprinkler_flow_switch,  mon_spinkler_pump_room, mon_sump_pump,  mon_generator_signal,  mon_other,gas_suppression_9, isCertificate,  isDisabled,service_reminder_date, service_reminder_date_to, certificate_date_created,  date_created) VALUES ('${this.templates.id}', '${this.templates.sp_id}', '${this.templates.site_id}', '${this.templates.client_id}', '${this.templates.service_type}','${this.templates.service}','${this.templates.site_contract}','${this.templates.site_name}','${this.location}','${this.address}','${this.templates.site_leader}','${this.templates.site_contact_number}','${this.templates.protected_areas}','${this.templates.responsible_person}','${this.templates.responsible_email}','${this.templates.system_category}','${this.templates.system_code}', '${this.templates.type_of_system}','${this.templates.service_contract_number}','${this.templates.service_precheck_1}','${this.templates.visual_inspection_2}', '${this.templates.fire_detection_panel_3}','${this.templates.cleaning_devices_4}', '${this.templates.test_device_loop_5}','${this.templates.other_detection_devices_6}', '${this.templates?.other_beam_detection}', '${this.templates?.other_air_sampling}', '${this.templates?.other_liner_heat}', '${this.templates?.other_flame_detection}', '${this.templates?.other_wireless}', '${this.templates.auxiliary_interface_7}','${this.templates.aux_stair_pressure_fans}', '${this.templates.aux_lift_pressure_fans}','${this.templates.aux_smoke_extraction}', '${this.templates.aux_smoke_ventilation}','${this.templates.aux_roller_shutter_doors}', '${this.templates.aux_fire_door_hold}','${this.templates.aux_escape_door_release}','${this.templates.aux_auto_evacuation}','${this.templates.aux_auto_remote_signal}', '${this.templates.aux_gas_shutoff_valves}','${this.templates.aux_cooker_head_suppression}', '${this.templates.aux_lift_homing}','${this.templates.aux_ac_shutdown}','${this.templates.aux_fresh_air_shutdown}','${this.templates.aux_other}', '${this.templates.monitoring_8}','${this.templates.mon_escape_doors}', '${this.templates.mon_sprinkler_flow_switch}','${this.templates.mon_spinkler_pump_room}','${this.templates.mon_sump_pump}','${this.templates.mon_generator_signal}','${this.templates.mon_other}','${this.templates.gas_suppression_9}','${this.templates.isCertificate}','${this.templates.isDisabled}','${this.templates.service_reminder_date}', '${this.templates.service_reminder_date_to}','${this.templates.certificate_date_created}','${this.templates.date_created}')`;
            this.database.executeSql(addTemplate, []).then((template: any) => {
              // console.log('Template Added: ' + JSON.stringify(template));
            });
          }
        });
      }

    });
    this.addPanels();
  }

  //PANELS RETURNS ONE RECORD HERE CHANGE CODE TMRW
  addPanels() {
    this.http.get(this.url + 'sp-all-panels.php').subscribe((res: any) => {
      this.panels = res;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < this.panels.length; i++) {
        //console.log('PANELS RESULT: ' + JSON.stringify(this.panels[i]));
        this.database.executeSql(`SELECT * FROM fire_sp_template_panels  WHERE panel_id=?`, [this.panels[i].id])
        .then((res1: any) => {
          if (res1.rows.length > 0) {
              this.queryP = res1.rows.item(0);
              // eslint-disable-next-line max-len
              const updateQuery =  [this.queryP.service_type_id,this.queryP.site_id,this.queryP.sp_id,this.queryP.panel_number,this.queryP.panel_name,this.queryP.panel_title,this.queryP.device_model,this.queryP.device_type,this.queryP.loop_1,this.queryP.loop_2,this.queryP.loop_3,this.queryP.loop_4,this.queryP.panel_status,this.queryP.panel_created];
              // eslint-disable-next-line max-len
              const panelUpdateQ = `UPDATE fire_sp_template_panels SET service_type_id=?, site_id=?, sp_id=?, panel_number=?, panel_name=?, panel_title=?, device_model=?, device_type=?, loop_1=?, loop_2=?, loop_3=?,loop_4=?, panel_status=?, panel_created=? WHERE panel_id=${this.queryP.panel_id}`;
              this.database.executeSql(panelUpdateQ, updateQuery).then((updatePanel: any) => {
              });
          } else {
            // console.log('NO PANEL: ');
            // eslint-disable-next-line max-len
            const panelInsert = `INSERT INTO fire_sp_template_panels (panel_id, service_type_id, sp_id, site_id, panel_number, panel_name, panel_title, device_model, device_type, loop_1, loop_2, loop_3,loop_4, panel_status, panel_created) VALUES ('${this.panels[i].id}','${this.panels[i].service_type_id}','${this.panels[i].sp_id}','${this.panels[i].site_id}','${this.panels[i].panel_number}','${this.panels[i].panel_name}','${this.panels[i].panel_title}','${this.panels[i].device_model}','${this.panels[i].device_type}','${this.panels[i].loop_1}','${this.panels[i].loop_2}','${this.panels[i].loop_3}','${this.panels[i].loop_4}','${this.panels[i].panel_status}','${this.panels[i].panel_created}')`;
            this.database.executeSql(panelInsert, []).then((addPanel: any) => {
            });
          }
        });
      }
    });
  }

  createServiceCertificate() {
    console.log('Create Service Certificates Table...');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      //this.dropTable();
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_sp_service_certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cert_id INTEGER,sp_id INTEGER, client_id INTEGER,
        service_type_id INTEGER, site_id INTEGER,
        service_technician_id INTEGER, service_name VARCHAR(40), client_company_name VARCHAR(100),
        service_contract_number VARCHAR(30), service_certificate_number VARCHAR(30),
        service_precheck_1 VARCHAR(30), visual_inspection_2 VARCHAR(30),
        fire_detection_panel_3 VARCHAR(30), cleaning_devices_4 VARCHAR(30),
        test_device_loop_5 VARCHAR(30),
        other_detection_devices_6 VARCHAR(30),
        other_beam_detection VARCHAR(30),
        other_air_sampling VARCHAR(30),
        other_liner_heat VARCHAR(30),
        other_flame_detection VARCHAR(30),
        other_wireless VARCHAR(30),
        auxiliary_interface_7 VARCHAR(30), aux_stair_pressure_fans VARCHAR(30),
        aux_lift_pressure_fans VARCHAR(30), aux_smoke_extraction VARCHAR(30),
        aux_smoke_ventilation VARCHAR(30), aux_roller_shutter_doors VARCHAR(30),
        aux_fire_door_hold VARCHAR(30), aux_escape_door_release VARCHAR(30),
        aux_auto_evacuation VARCHAR(30), aux_auto_remote_signal VARCHAR(30),
        aux_gas_shutoff_valves VARCHAR(30), aux_cooker_head_suppression VARCHAR(30),
        aux_lift_homing VARCHAR(30), aux_ac_shutdown VARCHAR(30),
        aux_fresh_air_shutdown VARCHAR(30), aux_other VARCHAR(30),
        monitoring_8 VARCHAR(30), mon_escape_doors VARCHAR(30),
        mon_sprinkler_flow_switch VARCHAR(30), mon_spinkler_pump_room VARCHAR(30),
        mon_sump_pump VARCHAR(30), mon_generator_signal VARCHAR(30),
        mon_other VARCHAR(30), gas_suppression_9 VARCHAR(30),
        service_comments TEXT, service_company VARCHAR(30),
        saqcc_number VARCHAR(30), date_service_completed TEXT,
        next_service_date TEXT, client_date_accepted TEXT,
        log_book_analysis_1_1 VARCHAR(10), event_archive_1_2 VARCHAR(10),
        analogue_value_check_1_3 VARCHAR(10), configuration_check_programming_1_4 VARCHAR(10),
        disabled_device_check VARCHAR(10), call_points_2_1 VARCHAR(10),
        building_structure_changes_2_2 VARCHAR(10), fire_detection_alarm_3_1 VARCHAR(10),
        fire_detection_alarm_3_2 VARCHAR(10), clean_device_panel_4_1 VARCHAR(10),
        clean_device_panel_4_2 VARCHAR(10), test_device_single_knock_5_1 VARCHAR(10),
        test_device_single_knock_5_2 VARCHAR(10), test_device_single_knock_5_3 VARCHAR(10),
        test_device_single_knock_5_4 VARCHAR(10), test_device_single_knock_5_5 VARCHAR(10),
        test_device_single_knock_5_6 VARCHAR(10), test_device_single_knock_5_7 VARCHAR(10),
        test_device_single_knock_5_8 VARCHAR(10), test_device_single_knock_5_9 VARCHAR(10),
        test_device_single_knock_5_10 VARCHAR(10), test_sounders_single_knock_5_1 VARCHAR(10),
        test_sounders_single_knock_5_2 VARCHAR(10), test_sounders_single_knock_5_3 VARCHAR(10),
        test_sounders_single_knock_5_4 VARCHAR(10), test_sounders_single_knock_5_5 VARCHAR(10),
        test_sounders_single_knock_5_6 VARCHAR(10), test_sounders_single_knock_5_7 VARCHAR(10),
        test_sounders_single_knock_5_8 VARCHAR(10), test_sounders_single_knock_5_9 VARCHAR(10),
        test_sounders_single_knock_5_10 VARCHAR(10), beam_detection_6_1 VARCHAR(10),
        air_sampling_6_2 VARCHAR(10), liner_heat_6_3 VARCHAR(10),
        flame_detection_6_4 VARCHAR(10), wireless_6_5 VARCHAR(10),
        stair_pressure_fans_7_1 VARCHAR(10), lift_pressure_fans_7_2 VARCHAR(10),
        smoke_extraction_fans_7_3 VARCHAR(10), smoke_ventilation_louvers_7_4 VARCHAR(10),
        roller_shutter_doors_7_5 VARCHAR(10), fire_doors_7_6 VARCHAR(10),
        escape_door_release_7_7 VARCHAR(10), auto_evacuation_7_8 VARCHAR(10),
        auto_remote_signal_7_9 VARCHAR(10), gas_valves_7_10 VARCHAR(10),
        cooker_suppression_7_11 VARCHAR(10), lift_homing_7_12 VARCHAR(10),
        ac_shutdown_7_13 VARCHAR(10), fresh_air_shutdown_7_14 VARCHAR(10),
        other_7_15 VARCHAR(10), escape_doors_8_1 VARCHAR(10),
        sprinkler_flow_8_2 VARCHAR(10), sprinkler_pump_room_8_3 VARCHAR(10),
        sump_pump_8_4 VARCHAR(10), generator_signals_8_5 VARCHAR(10),
        other_8_6 VARCHAR(10), single_knock_9_1 VARCHAR(10),
        double_knock_9_2 VARCHAR(10), fire_bells_9_3 VARCHAR(10),
        sounders_functional_9_4 VARCHAR(10), strobes_functional_9_5 VARCHAR(10),
        suppression_detonator_9_6 VARCHAR(10), door_monitor_9_7 VARCHAR(10),
        suppression_cylinder_9_8 VARCHAR(10), manual_switch_9_9 VARCHAR(10),
        client_comments TEXT, service_certificate_comments TEXT,
        date_client_signed TEXT, service_company_comments TEXT,
        date_tech_signed TEXT, fire_panel_1 VARCHAR(10),
        fire_panel_2 VARCHAR(10), fire_panel_3 VARCHAR(10),
        fire_panel_4 VARCHAR(10), fire_panel_5 VARCHAR(10),
        fire_panel_6 VARCHAR(10), fire_panel_7 VARCHAR(10),
        fire_panel_8 VARCHAR(10), fire_panel_9 VARCHAR(10),
        fire_panel_10 VARCHAR(10), fire_panel_11 VARCHAR(10),
        fire_panel_12 VARCHAR(10), fire_panel_13 VARCHAR(10),
        fire_panel_14 VARCHAR(10), fire_panel_15 VARCHAR(10),
        fire_panel_16 VARCHAR(10), fire_panel_17 VARCHAR(10),
        fire_panel_18 VARCHAR(10), fire_panel_19 VARCHAR(10),
        fire_panel_20 VARCHAR(10), fire_panel_21 VARCHAR(10),
        fire_panel_22 VARCHAR(10), fire_panel_23 VARCHAR(10),
        fire_panel_24 VARCHAR(10), fire_panel_25 VARCHAR(10),
        clean_device_1 VARCHAR(10), clean_device_2 VARCHAR(10),
        clean_device_3 VARCHAR(10), clean_device_4 VARCHAR(10),
        clean_device_5 VARCHAR(10), clean_device_6 VARCHAR(10),
        clean_device_7 VARCHAR(10), clean_device_8 VARCHAR(10),
        clean_device_9 VARCHAR(10), clean_device_10 VARCHAR(10),
        clean_device_11 VARCHAR(10), clean_device_12 VARCHAR(10),
        clean_device_13 VARCHAR(10), clean_device_14 VARCHAR(10),
        clean_device_15 VARCHAR(10), clean_device_16 VARCHAR(10),
        clean_device_17 VARCHAR(10), clean_device_18 VARCHAR(10),
        clean_device_19 VARCHAR(10), clean_device_20 VARCHAR(10),
        clean_device_21 VARCHAR(10), clean_device_22 VARCHAR(10),
        clean_device_23 VARCHAR(10), clean_device_24 VARCHAR(10),
        clean_device_25 VARCHAR(10), client_signature BLOB,
        company_rep_signature BLOB, service_status VARCHAR(10),
        tech_status VARCHAR(20), job_approve VARCHAR(20), arrival_time TEXT,
        service_date_1 TEXT, service_date_1_to TEXT,
        service_date_2 TEXT, service_date_2_to TEXT,
        service_date_3 TEXT, service_date_3_to TEXT,
        final_service_date TEXT, service_time TEXT,
        certificateResponse VARCHAR(20), rejectionReason TEXT,
        email_reminder_date TEXT, isSignOff TEXT,
        report_sent VARCHAR(20), report_date TEXT,
        date_signed_off_client TEXT, date_signed_off TEXT,
        date_assigned TEXT, date_accepted TEXT,
        date_completed TEXT, service_card_created TEXT, isSync VARCHAR(15))`,[]).then((res: any) => {
          //console.log('Service table created: ' + JSON.stringify(res));
        }, err => {
          console.log('Error Msg: ' + JSON.stringify(err));
        });

        // CREATE PANELS TABLE
        this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_sp_template_panels (
          id INTEGER PRIMARY KEY AUTOINCREMENT, panel_id INTEGER,
          service_type_id INTEGER, site_id INTEGER, sp_id INTEGER,
          panel_number VARCHAR(15), panel_name VARCHAR(80),
          panel_title VARCHAR(60), device_model VARCHAR(80),
          device_type VARCHAR(60), loop_1 VARCHAR(40),
          loop_2 VARCHAR(40), loop_3 VARCHAR(40),
          loop_4 VARCHAR(40), panel_status VARCHAR(10), panel_created TEXT)`,[]).then((panel: any) => {
            console.log('Panels table created: ' + JSON.stringify(panel));
        }, err => {
          console.log('Panel table error: ' + JSON.stringify(err));
        });

        // CREATE SERVICE TYPES
        this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_sp_service_type_templates (
          id INTEGER PRIMARY KEY AUTOINCREMENT, template_id INTEGER,
          site_id INTEGER,sp_id INTEGER, client_id INTEGER,
          service_type VARCHAR(40), service VARCHAR(40),
          site_contract VARCHAR(40), site_name VARCHAR(40),
          site_location VARCHAR(80), site_address VARCHAR(160),
          site_leader VARCHAR(60), site_contact_number VARCHAR(20),
          protected_areas VARCHAR(60), responsible_person VARCHAR(160),
          responsible_email VARCHAR(160),system_category VARCHAR(60),
          system_code VARCHAR(60), type_of_system VARCHAR(60),
          service_contract_number VARCHAR(60),
          service_precheck_1 VARCHAR(10),
          visual_inspection_2 VARCHAR(10),
          fire_detection_panel_3 VARCHAR(10),
          cleaning_devices_4 VARCHAR(10),
          test_device_loop_5 VARCHAR(10),
          other_detection_devices_6 VARCHAR(10),
          other_beam_detection VARCHAR(30),
          other_air_sampling VARCHAR(30),
          other_liner_heat VARCHAR(30),
          other_flame_detection VARCHAR(30),
          other_wireless VARCHAR(30),
          auxiliary_interface_7 VARCHAR(10),
          aux_stair_pressure_fans VARCHAR(10),
          aux_lift_pressure_fans VARCHAR(10),
          aux_smoke_extraction VARCHAR(10),
          aux_smoke_ventilation VARCHAR(10),
          aux_roller_shutter_doors VARCHAR(10),
          aux_fire_door_hold VARCHAR(10),
          aux_escape_door_release VARCHAR(10),
          aux_auto_evacuation VARCHAR(10),
          aux_auto_remote_signal VARCHAR(10),
          aux_gas_shutoff_valves VARCHAR(10),
          aux_cooker_head_suppression VARCHAR(10), aux_lift_homing VARCHAR(10),
          aux_ac_shutdown VARCHAR(10), aux_fresh_air_shutdown VARCHAR(10),  aux_other VARCHAR(10),  monitoring_8 VARCHAR(10),
          mon_escape_doors VARCHAR(10),  mon_sprinkler_flow_switch VARCHAR(10),  mon_spinkler_pump_room VARCHAR(10),
          mon_sump_pump VARCHAR(10),  mon_generator_signal VARCHAR(10),  mon_other VARCHAR(10),
          gas_suppression_9 VARCHAR(10), isCertificate VARCHAR(10),  isDisabled VARCHAR(10),
          service_reminder_date TEXT, service_reminder_date_to TEXT, certificate_date_created TEXT,  date_created TEXT)`,[])
          .then((panel: any) => {
            // console.log('Service Type table created: ' + JSON.stringify(panel));
        }, err => {
          // console.log('Service Type table error: ' + JSON.stringify(err));
        });
      }, err => {
        // console.log('Database Error: ' + JSON.stringify(err));
        this.updateServiceList();
      });
  }


  //PANELS
  addTemplates() {
    this.http.get(this.url + 'sp-all-panels.php').subscribe((res: any) => {
      this.templates = res;
      console.log('PANELS RESULT: ' + JSON.stringify(this.panels));
    });
  }

  dropTable() {
    this.database.executeSql(`DROP table fire_sp_service_certificates `,[])
    .then((resAdd: any) => {
      console.log('Query Result Tabled Dropped: ' + JSON.stringify(resAdd));
    });
  }

}
