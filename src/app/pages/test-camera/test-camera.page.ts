import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Component, NgZone, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BluetoothLE } from '@awesome-cordova-plugins/bluetooth-le/ngx';

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
    private ngZone: NgZone,
    private platform: Platform,
    private http: HttpClient,
    private bluetoothLE: BluetoothLE,
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

  ionViewWillEnter() {

  }

}
