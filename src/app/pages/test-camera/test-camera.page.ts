import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Component, NgZone, OnInit } from '@angular/core';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
// import { BluetoothLE } from '@awesome-cordova-plugins/bluetooth-le/ngx';
import * as moment from 'moment';
@Component({
  selector: 'app-test-camera',
  templateUrl: './test-camera.page.html',
  styleUrls: ['./test-camera.page.scss'],
})
export class TestCameraPage implements OnInit {
  data: any;
  status: any;
  statusMessage: any;
  devices: any[] = [];
  showConnect: boolean;
  showDisconnect: boolean;
  database: SQLiteObject;
  url = environment.url;
  constructor(
    private ble: BLE,
    // private bluetoothle: BluetoothLE,
    private ngZone: NgZone,
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private sqlite: SQLite,
    private http: HttpClient
  ) {
      this.showConnect = true;
      // const date = moment().format('YYYY-MM-d h:mm:ss');
      // console.log()
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    // this.sqlite.create({
    //   name: 'fireservices.db',
    //   location: 'default',
    // }).then((db: SQLiteObject) => {
    //   this.database = db;
    //   const certID='46';
    //   const stairPressureSql = 'SELECT * FROM fire_service_certificates WHERE cert_id=? ';
    //   this.database.executeSql(stairPressureSql, [certID]).then((stairPressureR: any) => {
    //     console.log('Record Found: ' + JSON.stringify(stairPressureR));
    //     if (stairPressureR.rows.length > 0) {
    //       const res = stairPressureR.rows.item(0);
    //       console.log('Record Found: ' + JSON.stringify(res));
    //       const status = 'Accepted';
    //       const job = 'Approved';
    //       const techStatus = 'Accepted';
    //       const dateAccepted = moment().format('YYYY-MM-D H:mm:ss');
    //       // eslint-disable-next-line max-len, max-len
    //       this.database.executeSql(`UPDATE fire_service_certificates SET service_status=?, job_approve=?, tech_status=?, date_accepted=? WHERE cert_id=${res.cert_id}`, [status, job, techStatus,dateAccepted])
    //       .then((log: any) => {
    //         console.log('UPDATE DATA: ' + JSON.stringify(log));
    //       }, err => {
    //       });
    //     }
    //   });
    // });
  }

  async scan() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.setStatus('Scanning for Devices');
    this.devices = [];
    this.ble.scan([], 15).subscribe((device: any) => {
      device = this.onDeviceDiscovered(device);
    });
    loading.present();
    setTimeout(() => {
      this.setStatus.bind(this);
    }, 5000, 'Scan Complete');
    loading.dismiss();
  }

  onDeviceDiscovered(device) {
    this.ngZone.run(() => {
      this.devices.push(device);
      console.log('Total devices: ' + this.devices.length);
      console.log(this.devices);
    });
  }

  connectDevice(deviceID) {
    console.log(deviceID);
    this.ble.connect(deviceID).subscribe((res: any) => {
      console.log('Connect?: ' + JSON.stringify(res));
      this.isConneccted(deviceID);
    }, err => {
      console.log('Disconnect?: ' + JSON.stringify(err));
    });
  }

  onDisconnect(deviceID) {
    this.ble.disconnect(deviceID).then((res: any) => {
      console.log('Disconnecting: ' + JSON.stringify(res));
    }, err => {
      console.log('Error Disconnecting : ' + JSON.stringify(err));
    });
  }

  async onConnectDevice(deviceID) {
    const alert = await this.alertController.create({
      header: 'Connect!',
      message: 'Do you want to connect with device?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.connectDevice(deviceID);
          }
        }
      ]
    });
    await alert.present();
  }

  setStatus(message) {
    this.ngZone.run(() => {
      this.statusMessage = message;
      console.log(this.statusMessage);
    });
  }

  async systemNotify(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  isConneccted(deviceID) {
    this.ble.isConnected(deviceID).then((res: any) => {
      console.log('Result: ' + res);
      if (res === 'OK') {
        this.showConnect = false;
        this.systemNotify('Bluetooth connected successfully');
      } else {
        this.showConnect = true;
      }
      console.log('Connect Status: ' + this.showConnect);
    });
  }
  stringToBytes(data) {
    const array = new Uint8Array(data.length);
    for (let c = 0; c < data.length; c++) {
       array[c] = data.charCodeAt(c);
    }
    return array.buffer;
  }

  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

}
