import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Component, NgZone, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BluetoothLE } from '@awesome-cordova-plugins/bluetooth-le/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  data: any;
  status: any;
  statusMessage: any;
  devices: any[] = [];
  showConnect: boolean;
  showDisconnect: boolean;
  database: SQLiteObject;
  url = environment.url;
  deviceVersion: any;
  constructor(
    private ngZone: NgZone,
    private platform: Platform,
    private router: Router,
    private http: HttpClient,
    private device: Device,
    private bluetoothLE: BluetoothLE,
    private alertController: AlertController
  ) {
    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.bluetoothLE.initialize().subscribe(ble => {
        console.log('ble', ble.status);
      });
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.checkAndroidVersion();
  }

  checkAndroidVersion() {
    if (this.platform.is('android')) {
        console.log('True Android');
        this.deviceVersion = this.device.version;
        console.log('Android Version: ' + this.deviceVersion );
        if (this.deviceVersion < '12') {
          this.presentAlertConfirm('Supported android version is android 12 and above!');
        }
    }
  }

  async presentAlertConfirm(msg) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/technician-menu/technician-dashboard']);
          }
        },
      ]
    });
    await alert.present();
  }

}
