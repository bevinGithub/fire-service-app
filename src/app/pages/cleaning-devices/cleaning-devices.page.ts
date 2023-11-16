import { NavController, ToastController, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { environment } from './../../../environments/environment';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cleaning-devices',
  templateUrl: './cleaning-devices.page.html',
  styleUrls: ['./cleaning-devices.page.scss'],
})
export class CleaningDevicesPage implements OnInit {
  sKnock: any = {};
  public devices: any;
  certID: any;
  siteID: any;
  panelID: any;
  panel: any;
  site: any;
  serviceTypeID: any;
  serviceType: any;
  networkStatus: any;
  database: SQLiteObject;
  url = environment.url;
  public form: FormGroup = this.formBuilder.group({});
  public fieldsCounter: any;
  field: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter(){
   this.cleaningDevices();
  }

  async cleaningDevices() {
    const loading = await this.loadingController.create({ message: 'Please wait...' });
    loading.present();
    this.serviceTypeID = this.serviceType;
    this.panelID = this.panel;
    this.sKnock.service_type_id = this.serviceTypeID;
    this.siteID = this.site;
    this.sKnock.site_id = this.siteID;
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    console.log(this.siteID + '------' + this.serviceTypeID + '-----' + this.panelID);
    this.sKnock.date_created = moment().format('YYYY-MM-D H:mm:ss');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      // eslint-disable-next-line max-len
      this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [this.serviceTypeID, this.siteID,this.panelID])
      .then((res: any) => {
        console.log('Result: ' + JSON.stringify(res));
        if (res.rows.length > 0) {
          const devices = [];
          for(let i=0; i < res.rows.length; i++) {
            devices.push(res.rows.item(i));
          }
          this.devices = devices;
          loading.dismiss();
        } else {
          loading.dismiss();
        }

        const counter = [];
        for(let i=0; i < this.devices.length; i++) {
          console.log(i);
          counter.push(this.devices[i].id);
          this.form.addControl('na_' + this.devices[i].id, this.formBuilder.control(this.devices[i].na, { updateOn: 'blur' }));
          this.form.addControl('cleaned_' + this.devices[i].id, this.formBuilder.control(this.devices[i].cleaned, { updateOn: 'blur' }));
          this.form.addControl('tested_' + this.devices[i].id, this.formBuilder.control(this.devices[i].tested, { updateOn: 'blur' }));
          // eslint-disable-next-line max-len
          this.form.addControl('correctMessage_' + this.devices[i].id, this.formBuilder.control(this.devices[i].correct_message, { updateOn: 'blur' }));
          // eslint-disable-next-line max-len
          this.form.addControl('newMessage_' + this.devices[i].id, this.formBuilder.control(this.devices[i].new_message, { updateOn: 'blur' }));
          // eslint-disable-next-line max-len
          this.form.addControl('serviceTypeID_' + this.devices[i].id, this.formBuilder.control(this.devices[i].service_type_id, { updateOn: 'blur' }));
          this.form.addControl('siteID_' + this.devices[i].id, this.formBuilder.control(this.devices[i].site_id, { updateOn: 'blur' }));
          this.form.addControl('id_' + this.devices[i].id, this.formBuilder.control(this.devices[i].id, { updateOn: 'blur' }));
          // eslint-disable-next-line max-len
          this.form.addControl('dateCreated_' + this.devices[i].id, this.formBuilder.control(this.devices[i].date_created, { updateOn: 'blur' }));
        }
        this.fieldsCounter = counter;
      }, err => {
        loading.dismiss();
        console.log('Error: ' +  JSON.stringify(err));
      });
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  onSubmit() {
    this.field = this.form.value;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0; i < this.fieldsCounter.length; i++) {
      const id = this.field['id_' + this.fieldsCounter[i]];
      const isSync = 'No';
      console.log('RECORD ID: ' + id);
      // eslint-disable-next-line max-len
      const updateValues = [this.field['na_' + this.fieldsCounter[i]],  this.field['cleaned_' + this.fieldsCounter[i]], this.field['tested_' + this.fieldsCounter[i]], this.field['correctMessage_' + this.fieldsCounter[i]], this.field['newMessage_' + this.fieldsCounter[i]], isSync];
      console.log(updateValues);
      // eslint-disable-next-line max-len
      this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET na=?, cleaned=?, tested=?, correct_message=?, new_message=?, isSync=? WHERE id=${id}`, updateValues)
      .then((res: any) => {
        console.log(res);
      }, err => {
        console.log('fire_template_device_loops_table ERROR: ' + JSON.stringify(err));
      });
    }
    this.presentToast('Cleaning devices successfully saved!');
    this.modalController.dismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
