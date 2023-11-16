import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@awesome-cordova-plugins/bluetooth-le/ngx';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { TagsDataPage } from 'src/app/modals/tags-data/tags-data.page';
import { AudioService } from 'src/app/services/audio.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-broadcast-device',
  templateUrl: './broadcast-device.page.html',
  styleUrls: ['./broadcast-device.page.scss'],
})
export class BroadcastDevicePage implements OnInit {
  output = 'Output:';
  isPlatformReady: boolean;
  subBluetoothInit: Subscription | undefined = undefined;
  subPeripheralInit: Subscription | undefined = undefined;

  peripheralData: {
    uuid: string;
    name: string;
    value: string;
  } [] = [
    {
      name: 'referenceNumber',
      uuid: 'd6da1884-7d0e-11ed-a1eb-0242ac120002',
      value: '',
    },
    {
      uuid: 'da4da86e-7d0e-11ed-a1eb-0242ac120002',
      name: 'tagDate',
      value: '',
    },
    {
      uuid: 'dd8b3d0c-7d0e-11ed-a1eb-0242ac120002',
      name: 'serviceTypeID',
      value: '',
    },
    ];

    deviceTags: any = {};
    passedVal: any;
    siteID: any;
    tagNumber: any;
    deviceNumber: any;
    deviceType: any;
    referenceNumber: any;
    tagDate: any;
    serviceTypeID: any;
    message: any;
    scanDate: any;
    database: SQLiteObject;
    deviceResults: any;
    errorResult: any;
    resultNotice: any;
    showResults: boolean;
    showError: boolean;
    scannedTag: any;
    showScannedTag: boolean;
    scannedDate: any;
    siteResult: any;
    siteName: any;
    url = environment.url;
  constructor(
    private bluetoothLE: BluetoothLE,
    private changeDetectorRef: ChangeDetectorRef,
    private platform: Platform,
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private sqlite: SQLite,
    private audioService: AudioService,
    private http: HttpClient,
    private storage: Storage,
  ) {
    this.isPlatformReady = false;
    this.platform.ready().then(async () => {
      this.isPlatformReady = true;
      console.log(`<br>Platform ready.`);
    });
    this.storage.get('currentUser').then((user: any) => {
        this.deviceTags.tech_id = user?.id;
    });
    this.scanDate = moment().format('YYYY-MM-D H:mm:ss');
    // this.sqlite.create({
    //   name: 'fireservices.db',
    //   location: 'default',
    // }).then((db: SQLiteObject) => {
    //   this.database = db;
    // });
    // this.showResults = false;
    // this.showError = false;
    // this.showScannedTag = false;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    // this.sqlite.create({
    //   name: 'fireservices.db',
    //   location: 'default',
    // }).then((db: SQLiteObject) => {
    //   this.database = db;
    // });
    this.showResults = false;
    this.showError = false;
    this.showScannedTag = false;
  }

  allowPermission() {
    this.bluetoothLE.requestPermission().then((result: any) => {
      console.log(result);
      this.enableBluetooth();
    }, err => {
      console.log(err);
    });
  }

  enableBluetooth() {
    this.bluetoothLE.enable();
  }

  print(text: string) {
    this.output += text;
    this.changeDetectorRef.detectChanges();
  }

  async bluetoothInit() {
    this.allowPermission();
    console.log('Activate');
    this.subBluetoothInit = this.bluetoothLE.initialize({
      request: true,
      statusReceiver: true
    }).subscribe({
      next: (event) => {
        console.log('Event Status: ');
        console.log(event);
        if (event.status === 'enabled') {
          this.presentToast(`Device is activated!`);
          this.peripheralInit();
        }
      },
      error: (error) => {
        this.presentToast(`<br><br>Bluetooth error:<br>${JSON.stringify(error)}`);
      },
      complete: () => {
        this.presentToast(`<br><br>Bluetooth complete.`);
      },
    });
  }

  async peripheralInit() {
    console.log(`<br>peripheralInit()... invoked.`);
    this.subPeripheralInit = this.bluetoothLE.initializePeripheral({
      request: true,
    }).subscribe({
      next: (event) => {
        this.print(`<br><br>Peripheral value:<br>${JSON.stringify(event)}.`);
        this.peripheralData = [
          {
            name: 'referenceNumber',
            uuid: 'd6da1884-7d0e-11ed-a1eb-0242ac120002', // Arbitrary UUID
            value: event.value,
          },
          {
            uuid: 'da4da86e-7d0e-11ed-a1eb-0242ac120002',
            name: 'tagDate',
            value: event.value
          },
          {
            uuid: 'dd8b3d0c-7d0e-11ed-a1eb-0242ac120002',
            name: 'serviceTypeID',
            value: event.value
          },
        ];
        switch (event.status) {
          case 'readRequested': {
            const characteristic = this.peripheralData.find(i => i.uuid.toLowerCase() === event.characteristic.toLowerCase());
            if (!characteristic) {
              break;
            }
            this.respondReadRequest(event.requestId, event.address, characteristic.value);
            break;
          }
          case 'writeRequested': {
            const characteristic = this.peripheralData.find(i => i.uuid.toLowerCase() === event.characteristic.toLowerCase());
            if (!characteristic) {
              break;
            }
            this.passedVal = atob(event.value);
            if (characteristic.name === 'referenceNumber') {
              this.referenceNumber = this.passedVal;
            }
            if (characteristic.name === 'tagDate') {
              this.tagDate = this.passedVal;
            }
            if (characteristic.name === 'serviceTypeID') {
              this.serviceTypeID = this.passedVal;
            }
            if (this.referenceNumber && this.serviceTypeID) {
              this.displayTagData(this.referenceNumber);
              //SEARCH HERE
              this.searchDeviceOffline(this.referenceNumber, this.serviceTypeID);
            }

            characteristic.value = atob(event.value); // Decode base64
            this.respondReadRequest(event.requestId, event.address, characteristic.value);
            break;
          }
        }
      },
      error: error => {
        this.presentToast(`<br><br>Peripheral error:<br>${JSON.stringify(error)}.`);
      },
      complete: () => {
        this.presentToast(`<br><br>Peripheral complete.`);
      },

    });
  }

  async respondReadRequest(requestId: number, address: string, value: string) {
    try {
      const responded = await this.bluetoothLE.respond({
        requestId,
        value: btoa(value), // Convert string to base64
        //@ts-ignore: Address is required for Android
        address
      });
    }
    catch (error) {
      this.presentToast(`<br><br>Reading Error:<br>${JSON.stringify(error)}`);
    }
  }

  async addService() {
    //this.print(`<br><br>addService() invoked.`);
    try {
      const service = await this.bluetoothLE.addService({
        service: '883f4662-48e4-4fd2-808b-8cf78a37d787', // FSA RFID tag service
        // eslint-disable-next-line arrow-body-style
        characteristics: this.peripheralData.map(i => {
          return {
            uuid: i.uuid,
            permissions: { read: true, write: true },
            properties: { read: true, write: true },
            // descriptors: [{ uuid: "2902" }]
          };
        })
      });
      this.presentToast('Service added successfully!');
      console.log('Service added successfully!');
    }
    catch (error) {
      this.presentToast(`Service error: ${JSON.stringify(error)}`);
      console.log('Service Error: ');
      console.log(error);
    }
  }

  advertiseDevice() {
    this.bluetoothLE.requestPermissionBtAdvertise().then((resp: any) => {
      console.log('Permissions Status Success: ');
      console.log(resp);
    }, err => {
      console.log('Device Permission Error: ');
      console.log(err);
    });
  }

  async advertise() {
    this.advertiseDevice();
    try {
      const advertisement = await this.bluetoothLE.startAdvertising({
        includeDeviceName: true,
        includeTxPowerLevel: true,
        service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
        name: 'FSA', // Name cannot be longer or else "Too large data" errors appear
        txPowerLevel: 'high',
        connectable: true,
        mode: 'balanced',
        timeout: 10000,
      });
      this.presentToast('Device has started broadcasting for connection...');
    } catch (error) {
      console.log(error);
      //alert(JSON.stringify(error));
      this.presentToast('Error: Device could not start broadcasting for connection...');
    }
  }

  async stopAdvertising() {
    this.removeAllServices();
    await this.bluetoothLE.stopAdvertising().then((res: any) => {
      console.log(res);
      this.presentToast('Broadcasting has been cancelled, please restart process!');
    });
  }

  async removeAllServices() {
    await this.bluetoothLE.removeAllServices().then((service:  any) => {
      console.log(service);
    });
  }

  async newAddService() {
    try {
      const service = await this.bluetoothLE.addService({
        service: '883f4662-48e4-4fd2-808b-8cf78a37d787', // FSA RFID tag service
        // eslint-disable-next-line arrow-body-style
        characteristics: this.peripheralData.map(i => {
          return {
            uuid: i.uuid,
            permissions: { read: true, write: true },
            properties: { read: true, write: true },
          };
        })
      });
      this.presentToast('Service added successfully!');
      this.advertise();
    }
    catch (error) {
      //alert(JSON.stringify(error));
      this.presentToast(`Service error: ${JSON.stringify(error)}`);
    }
  }

  displayTagData(refNumber) {
    console.log(refNumber);
    this.scannedTag =  {
      referenceNumber: refNumber,
    };
    this.presentToast(JSON.stringify(this.scannedTag));
    if(this.scannedTag) {
      this.showScannedTag = true;
    } else {
      this.showScannedTag = false;
    }
  }

  searchDeviceOffline(refNum: any, serviceTypeId: any) {
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;

      this.showResults = false;
      this.showError = false;
      console.log('Search Tag: ' + refNum);
      if (refNum) {
        console.log('Ref Number Found');
        const deviceSql = 'SELECT * FROM fire_sp_template_device_loops_table WHERE reference_number=? AND service_type_id=?';
        this.database.executeSql(deviceSql,[refNum,serviceTypeId]).then((deviceRes: any) => {
          console.log(deviceRes.rows.length);
          if (deviceRes.rows.length > 0) {
            console.log(deviceRes.rows.item());
            this.showResults = true;
            this.showError = false;
            this.deviceResults = deviceRes.rows.item(0);
            this.deviceTags = deviceRes.rows.item(0);
            console.log(this.deviceTags);
            this.presentToast('Scan data has been found!');
            //GET SITE NAME
            const siteQuery = 'SELECT * FROM fire_sp_sites WHERE site_id=?';
            this.database.executeSql(siteQuery,[this.deviceResults?.site_id]).then((site: any) => {
              console.log(site);
              if(site.rows.length > 0) {
                this.siteResult = site.rows.item(0);
                this.siteName = this.siteResult?.site_name;
              }
            }, err => {
              console.log(err);
            });
          } else {
            this.showError = true;
            this.showResults = false;
            this.errorResult = 'Scan data not found!';
            this.presentToast('Scan data not found!');
          }
        }, err => {
          this.print(JSON.stringify(err));
          this.showError = true;
          this.showResults = false;
          this.errorResult = 'Query Error: ' + JSON.stringify(err);
          this.presentToast('Query Error: ' + JSON.stringify(err));
        });
      } else {
        this.showError = true;
        this.showResults = false;
        this.errorResult = 'Reference Number is missing from the NFC data!';
      }
    });
  }

  searchOnlineDevice(site, tag, device, msg) {
    this.showResults = false;
    this.showError = false;
    if (site !== '' && tag  !== '' && device  !== '') {
      this.http.get(this.url + 'bluetooth-devices.php?siteID=' + site + '&tagID=' + tag + '&addr=' + device).subscribe((res: any) => {
        console.log(res);
        if (res !== 'No Record Found') {
          this.showResults = true;
            this.showError = false;
            this.deviceResults = res;
            //this.print(JSON.stringify(this.deviceResults));
            if (msg === this.deviceResults.device_message) {
              const rightMsg = this.deviceResults.device_message;
              this.resultNotice = 'NFC card location message: ' + msg;
            } else {
              //this.print('Wrong location message!');
              this.resultNotice = 'NFC card location does not match: ' + msg;
            }
            this.presentToast('Scan data has been found!');
        } else {
          this.showError = true;
            this.showResults = false;
            this.errorResult = 'Scan data not found!';
            this.presentToast('Scan data not found!');
        }
      });
    } else {
      this.showError = true;
      this.showResults = false;
      this.errorResult = 'Site ID or Tag Number or Device Number is missing from the NFC data!';
    }
  }

  searchDeviceOffline2(site, tag, device, msg) {
    this.showResults = false;
    this.showError = false;
    if (site !== '' && tag  !== '' && device  !== '') {
      const deviceSql = 'SELECT * FROM fire_sp_template_device_loops_table WHERE site_id=? AND rftag=? AND addr=?';
      this.database.executeSql(deviceSql, [site, tag, device]).then((deviceRes: any) => {
        if (deviceRes.rows.length > 0) {
          this.showResults = true;
          this.showError = false;
          this.deviceResults = deviceRes.rows.item(0);
          this.deviceTags = deviceRes.rows.item(0);
          console.log(this.deviceTags);
          if (msg === this.deviceResults.device_message) {
            const rightMsg = this.deviceResults.device_message;
            this.resultNotice = 'NFC card location message: ' + msg;
          }
          this.presentToast('Scan data has been found!');
        } else {
          this.showError = true;
          this.showResults = false;
          this.errorResult = 'Scan data not found!';
          this.presentToast('Scan data not found!');
        }
      }, err => {
        this.print(JSON.stringify(err));
        this.showError = true;
        this.showResults = false;
        this.errorResult = 'Query Error: ' + JSON.stringify(err);
        this.presentToast('Query Error: ' + JSON.stringify(err));
      });
    } else {
      this.showError = true;
      this.showResults = false;
      this.errorResult = 'Site ID or Tag Number or Device Number is missing from the NFC data!';
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'RFID RESPONSE',
      message: msg,
      buttons: [
        {
          text: 'Dismiss',
          handler: () => {
            this.audioService.stopAlertSound('alert');
          }
        }
      ]
    });
    // PLAY THE SOUND
    this.audioService.playAlertSound('alert');
    await alert.present();
  }

  updateDevice(){
    this.scannedDate = moment().format('YYYY-MM-DD');
    console.log(this.deviceTags);
    // eslint-disable-next-line max-len
    const updateDevice = [this.deviceTags.tech_id, this.deviceTags.cleaned, this.deviceTags.tested, this.deviceTags.correct_message,this.deviceTags.new_message,'No', this.scannedDate];
    // eslint-disable-next-line max-len
    this.database.executeSql(`UPDATE fire_sp_template_device_loops_table  SET tech_id=?, cleaned=?, tested=?, correct_message=?, new_message=?, isSync=?, date_scanned=? WHERE device_id=${this.deviceTags.device_id}`, updateDevice)
      .then((update: any) => {
        console.log('Device UPDATED: ' + JSON.stringify(update));
        this.presentToast('Device has been successfully updated!');
      }, err => {
        console.log('Device UPDATE Error: ' + JSON.stringify(err));
      });
  }
}
