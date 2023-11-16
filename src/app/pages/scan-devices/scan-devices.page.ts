
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AndroidGattTransportMode, BluetoothLE } from '@awesome-cordova-plugins/bluetooth-le/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan-devices',
  templateUrl: './scan-devices.page.html',
  styleUrls: ['./scan-devices.page.scss'],
})
export class ScanDevicesPage implements OnInit {
  output: string;

  isScanning: boolean;
  address: string;
  public services: any = false;
  scanSub: Subscription | undefined = undefined;

  devices = [];
  wasConnected: any;
  conectBtn: boolean;
  diconnectBtn: boolean;
  servicesList: any;

  flags: any;
  readerMode: any;
  readingTag: boolean;
  database: SQLiteObject;
  url = environment.url;

  public tag: any;
  public siteID: any;
  public certID: any;
  public deviceNumber: any;
  public deviceType: any;
  public tagMessage: any;
  public tagZone: any;
  public tagDate: any;
  public serviceID: any;
  public serviceTypeID: any;
  public tagNumber: any;
  public audioSound: any;
  public referenceNumber: any;

  public count: any;
  showScanResult: boolean;
  constructor(
    private bluetoothLE: BluetoothLE,
    private changeDetectorRef: ChangeDetectorRef,
    private platform: Platform,
    private toastController: ToastController,
    private alertController: AlertController,
    private sqlite: SQLite,
    private router: Router,
    private ngZone: NgZone,
    public  nfc: NFC,
    public  ndef: Ndef,
    private http: HttpClient
  ) {
    this.conectBtn = true;
    this.diconnectBtn = false;
    this.output = '';
    this.isScanning = false;
    this.showScanResult = false;
    this.address = '';
    this.platform.ready().then(async () => {
      this.changeDetectorRef.detectChanges();
      await new Promise((resolve, reject) => {
        this.bluetoothLE.initialize().subscribe({
          next: resolve,
          error: reject
        });
      });
      this.allowPermission();
      this.enableBluetooth();
      this.changeDetectorRef.detectChanges();
    });
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showScanResult = false;
  }

  allowPermission() {
    this.bluetoothLE.requestPermission().then((result: any) => {
      console.log(result);
    }, err => {
      console.log(err);
    });
  }

  enableBluetooth() {
    this.bluetoothLE.enable();
  }

  async startScan() {
    this.bluetoothLE.startScan({}).subscribe({
      next: (next) => {
        this.output += `<br><br>Scan:<br>${JSON.stringify(next)}`;
        if (next.name === 'FSA') {
          this.devices.push(next);
          this.address = next.address;
          this.stopScan();
        }
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        // this.output += `<br><br>Scan error: ${JSON.stringify(error)}`
        console.log(error);
        this.changeDetectorRef.detectChanges();
      },
      complete: () => this.output += `<br>Scan complete.`,
    });
    this.isScanning = true;
    setTimeout(async () => this.stopScan(), 3000);
  }

  async stopScan() {
    await this.bluetoothLE.stopScan();
    this.isScanning = false;
  }

  async connect() {
    this.bluetoothLE.connect({
      address: this.address,
      // autoConnect: true,
      // transport: AndroidGattTransportMode.TRANSPORT_AUTO
    }).subscribe({
      next: (next) => {
        this.output += `<br><br>Connect:<br>${JSON.stringify(next)}`;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        this.output += `<br><br>Connect error:<br>${JSON.stringify(error)}`;
        this.changeDetectorRef.detectChanges();
      },
      complete: () => this.output += `<br>Connect complete.`,
    });
  }

  async disconnect() {
    try {
      const result = await this.bluetoothLE.disconnect({ address: this.address });
      // this.output += `<br><br>Disconnect:<br>${JSON.stringify(result)}`
      if (result.status === 'disconnected') {
        this.conectBtn = true;
        this.diconnectBtn = false;
      }
    }
    catch (error) {
      this.output += `<br><br>Disconnect error:<br>${JSON.stringify(error)}`;
    }

  }

  async reconnect() {
    this.bluetoothLE.reconnect({
      address: this.address,
    }).subscribe({
      next: (next) => {
        this.output += `<br><br>Reconnect:<br>${JSON.stringify(next)}`;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        this.output += `<br><br>Reconnect error:<br>${JSON.stringify(error)}`;
        this.changeDetectorRef.detectChanges();
      },
      complete: () => this.output += `<br>Reconnect complete.`,
    });
  }

  async discover() {
    this.bluetoothLE.discover({
      address: this.address,
      clearCache: true
    }).then((next) => {
      this.output += `<br><br>Discover:<br>${JSON.stringify(next)}`;
      if (Array.isArray(next.services)) {
        for (const service of next.services) {
          this.output += `<br><br>Service:<br>${JSON.stringify(service)}`;
        }
      }
      this.services = next.services;
      this.changeDetectorRef.detectChanges();
    }).catch((error) => {
      this.output += `<br><br>Discover error:<br>${JSON.stringify(error)}`;
      this.changeDetectorRef.detectChanges();
    });
  }

  async read() {
    // This reads all services' characteristics
    for (const service of this.services) {
      for (const characteristic of service.characteristics) {
        try {
          const readResult = await this.bluetoothLE.read({
            address: this.address,
            service: service.uuid,
            characteristic: characteristic.uuid
          });
          this.output += `<br><br>Read:<br>${JSON.stringify({
            ...readResult,
            decodedValue: atob(readResult.value) // Decode from base64
          })}`;
          this.changeDetectorRef.detectChanges();
        }
        catch (error) {
          this.output += `<br><br>Read error:<br>${JSON.stringify(error)}`;
          this.changeDetectorRef.detectChanges();
        }
      }
    }
  }

  async write() {
    try {
      const result = await this.bluetoothLE.write({
        address: this.address,
        service: '883f4662-48e4-4fd2-808b-8cf78a37d787', // Copy the UUID used to initialize the peripheral service
        characteristic: 'd6da1884-7d0e-11ed-a1eb-0242ac120002', // Copy the UUID of a service characteristic.
        value: btoa('123 456 7890') // Remember to encode to base64. Use 8 chars or less.
      });
      this.output += `<br><br>Write:<br>${JSON.stringify(result)}`;
      this.changeDetectorRef.detectChanges();
    }
    catch (error) {
      this.output += `<br><br>Write error:<br>${JSON.stringify(error)}`;
      this.changeDetectorRef.detectChanges();
    }
  }

  // =======================
  // BEVIN CODE STARTS HERE
  async deviceRead() {
    for (const service of this.services) {
      for (const characteristic of service.characteristics) {
        try {
          const readResult = await this.bluetoothLE.read({
            address: this.address,
            service: service.uuid,
            characteristic: characteristic.uuid
          });
          this.output += `<br><br>Read:<br>${JSON.stringify({
            ...readResult,
            decodedValue: atob(readResult.value) // Decode from base64
          })}`;
          console.log(JSON.stringify(atob(readResult.value)));
          this.changeDetectorRef.detectChanges();
        }
        catch (error) {
          this.output += `<br><br>Read error:<br>${JSON.stringify(error)}`;
          this.changeDetectorRef.detectChanges();
        }
      }
    }
  }

  deviceWrite() {
    //siteID
    const siteID = this.bluetoothLE.write({
      address: this.address,
      service: '883f4662-48e4-4fd2-808b-8cf78a37d787', // Copy the UUID used to initialize the peripheral service
      characteristic: 'd6da1884-7d0e-11ed-a1eb-0242ac120002', // Copy the UUID of a service characteristic.
      value: btoa('20')
    }).then((siteRes: any) => {
      console.log(siteRes);
    }, err => {
      console.log(err);
    });
    //tagNumber
    const tagNumber = this.bluetoothLE.write({
      address: this.address,
      service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
      characteristic: 'da4da86e-7d0e-11ed-a1eb-0242ac120002',
      value: btoa('1069')
    }).then((tagRes: any) => {
      console.log(tagRes);
    }, err => {
      console.log(err);
    });
    //deviceNumber/Addr
    const deviceNumber = this.bluetoothLE.write({
      address: this.address,
      service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
      characteristic: 'dd8b3d0c-7d0e-11ed-a1eb-0242ac120002',
      value: btoa('1011')
    }).then((deviceRes: any) => {
      console.log(deviceRes);
    }, err => {
      console.log(err);
    });
  }

  scanDevices() {
    this.bluetoothLE.startScan({}).subscribe((next: any) => {
      this.alertMsg('Device scanning has started...');
      if (next.name === 'FSA') {
        this.devices.push(next);
        this.address = next.address;
        console.log(next);
        this.stopScan();
      }
    }, err => {
      console.log('Not stopping');
      console.log(err);
    });
    this.isScanning = true;
    setTimeout(async () => this.stopScan(), 5000);
    console.log('Stop Scan');
    this.showScanResult = true;
  }

  connectDevice(data) {
    console.log(data);
    const params = {
      address: data.address,
      autoConnect: false,
      clearCache: true
    };
    this.bluetoothLE.connect({ address: data.address }).subscribe((conn: any) => {
      console.log(conn);
      if (conn.status === 'connected') {
        this.conectBtn = false;
        this.diconnectBtn = true;
        this.alertMsg('Connected successfully to device: ' + conn.name);
      }
      if (conn.status === 'disconnected') {
        this.alertMsg('Device has disconnected!');
      }
    }, err => {
      console.log(err);
      this.alertMsg(err.message);
    });
  }

  disconnectDevice(data) {
    console.log(data);
    // const dev = data?.resp;
    // this.bluetoothLE.disconnect({ address: dev.address }).then((res: any) => {
    //   console.log(res);
    //   this.alertMsg('Device has been ' + res.status);
    // }, err => {
    //   console.log(err);
    //   this.alertMsg(err.message);
    // });
    this.closeConnection(data);
  }

  closeConnection(data) {
    const device = data?.resp;
      this.bluetoothLE.close({ address: device?.address}).then((result: any) => {
        console.log(result);
      }, err => {
        console.log(err);
        this.alertMsg(err.message);
      });
  }

  reconnectDevice(data) {
    const add = data?.resp;
    this.bluetoothLE.reconnect({ address: add?.address}).subscribe((result: any) => {
      console.log(result);
      this.alertMsg('Device: ' + result.name + ' is now ' + result.status);
    }, error => {
      console.log(error);
      this.alertMsg(error.message);
    });
  }

  discoverDevice(data) {
    console.log(data);
    const device = data?.resp;
    const add = device?.address;
    this.bluetoothLE.discover({ address: add, clearCache: true }).then((list: any) => {
      console.log(list);
      this.servicesList = list.services;
      console.log(this.servicesList);
      this.alertMsg('Device services available');
    }, err => {
      console.log(JSON.stringify(err));
      this.alertMsg('Device sevices not available, please disconnect and scan again!');
    });
  }

  async alertMsg(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  // ######################################### NFC READ DATA
  deviceNFCReadWrite() {
    console.log('Reader Initializing');
    this.alertMsg('Please place the device close to tag to read.');
    // eslint-disable-next-line no-bitwise
    this.flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode = this.nfc.readerMode(this.flags).subscribe((tagRes: any) => {
      try {
        console.log(tagRes);
        this.tag = tagRes;
        const tagCheck = this.tag.ndefMessage;
        if (!tagCheck) {
          this.alertMsg('The tag is empty!');
        } else {
          if (this.tag.ndefMessage[0]) {
            console.log('ReferenceNumber: Yes');
            this.referenceNumber = this.nfc.bytesToString(this.tag.ndefMessage[0].payload).substring(3);
            this.bluetoothLE.write({
              address: this.address,
              service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
              characteristic: 'd6da1884-7d0e-11ed-a1eb-0242ac120002',
              value: btoa(this.referenceNumber)
            }).then((refRes: any) => {
              console.log('Writing Yes +++++++++');
              console.log(refRes);
            }, err => {
              console.log('Writing No ===========');
              console.log(err);
            });
          } else {
            this.referenceNumber = '';
          }
          if (this.tag.ndefMessage[1]) {
            console.log('Written Date: Yes');
            this.tagDate = this.nfc.bytesToString(this.tag.ndefMessage[1].payload).substring(3);
            this.bluetoothLE.write({
              address: this.address,
              service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
              characteristic: 'da4da86e-7d0e-11ed-a1eb-0242ac120002',
              value: btoa(this.tagDate)
            }).then((dateRes: any) => {
              console.log('Writing Yes +++++++++');
              console.log(dateRes);
            }, err => {
              console.log('Writing No ===========');
              console.log(err);
            });
          } else {
            this.tagDate = '';
          }
          if (this.tag.ndefMessage[2]) {
            console.log('Written ServiceTypeID: Yes');
            this.serviceTypeID = this.nfc.bytesToString(this.tag.ndefMessage[2].payload).substring(3);
            this.bluetoothLE.write({
              address: this.address,
              service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
              characteristic: 'dd8b3d0c-7d0e-11ed-a1eb-0242ac120002',
              value: btoa(this.serviceTypeID)
            }).then((serviceRes: any) => {
              console.log('Writing Yes +++++++++');
              console.log(serviceRes);
            }, err => {
              console.log('Writing No ===========');
              console.log(err);
            });
          } else {
            this.serviceTypeID = '';
          }
          this.getTagData(this.tag);
        }
        this.readingTag = false;
      } catch (error) {
        console.log(error);
      }

    }, err => {
      console.log(err);
      this.alertMsg('Error: NFC not detected!');
    });
  }

  deviceNFCReadWrite2() {
    console.log('Reader Initializing');
    this.alertMsg('Please place the device close to tag to read.');
    // eslint-disable-next-line no-bitwise
    this.flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode = this.nfc.readerMode(this.flags).subscribe((tagRes: any) => {
      try {
        console.log(tagRes);
        this.tag = tagRes;
        const tagCheck = this.tag.ndefMessage;
        if (!tagCheck) {
          this.alertMsg('The tag is empty!');
        } else {
          if (this.tag.ndefMessage[0]) {
            console.log('SiteID: Yes');
            this.siteID = this.nfc.bytesToString(this.tag.ndefMessage[0].payload).substring(3);
            //siteID
            this.bluetoothLE.write({
              address: this.address,
              service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
              characteristic: 'd6da1884-7d0e-11ed-a1eb-0242ac120002',
              value: btoa(this.siteID)
            }).then((siteRes: any) => {
              console.log('Writing Yes +++++++++');
              console.log(siteRes);
            }, err => {
              console.log('Writing No ===========');
              console.log(err);
            });
          } else {
            this.siteID = '';
          }
          if (this.tag.ndefMessage[1]) {
            console.log('SiteID: Yes');
            this.tagNumber = this.nfc.bytesToString(this.tag.ndefMessage[1].payload).substring(3);
            this.bluetoothLE.write({
              address: this.address,
              service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
              characteristic: 'da4da86e-7d0e-11ed-a1eb-0242ac120002',
              value: btoa(this.tagNumber)
            }).then((tagResult: any) => {
              console.log(tagResult);
            }, err => {
              console.log(err);
            });
          } else {
            this.tagNumber = '';
            console.log('Tag none: Yes');
          }
          if (this.tag.ndefMessage[2]) {
            this.deviceNumber = this.nfc.bytesToString(this.tag.ndefMessage[2].payload).substring(3);
            this.bluetoothLE.write({
              address: this.address,
              service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
              characteristic: 'dd8b3d0c-7d0e-11ed-a1eb-0242ac120002',
              value: btoa(this.deviceNumber)
            }).then((deviceRes: any) => {
              console.log(deviceRes);
            }, err => {
              console.log(err);
            });
          } else {
            this.deviceNumber = '';
          }

          if (this.tag.ndefMessage[3]) {
            this.deviceType = this.nfc.bytesToString(this.tag.ndefMessage[3].payload).substring(3);
            this.bluetoothLE.write({
              address: this.address,
              service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
              characteristic: '12d7f958-2fdb-11ee-be56-0242ac120002',
              value: btoa(this.deviceType)
            }).then((deviceRes: any) => {
              console.log(deviceRes);
            }, err => {
              console.log(err);
            });
          } else {
            this.deviceType = '';
          }

          if (this.tag.ndefMessage[5]) {
            this.tagMessage  = this.nfc.bytesToString(this.tag.ndefMessage[5].payload).substring(3);
            this.bluetoothLE.write({
              address: this.address,
              service: '883f4662-48e4-4fd2-808b-8cf78a37d787',
              characteristic: '8c1b01a2-2fdb-11ee-be56-0242ac120002',
              value: btoa(this.tagMessage)
            }).then((deviceRes: any) => {
              console.log(deviceRes);
            }, err => {
              console.log(err);
            });
          }
          this.getTagData(this.tag);
        }
        this.readingTag = false;
      } catch (error) {
        console.log(error);
      }

    }, err => {
      console.log(err);
      this.alertMsg('Error: NFC not detected!');
    });
  }

  nfcReadData() {
    console.log('Reader Initializing');
    // eslint-disable-next-line no-bitwise
    this.flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode = this.nfc.readerMode(this.flags).subscribe((tag: any) => {
      console.log(tag);
      this.readingTag = false;
      this.getTagData(tag);
      this.readingTag = false;
    }, err => {
      console.log(err);
    });
  }

  async getTagData(tag) {
    if (tag.ndefMessage[0]) {
      this.referenceNumber  = this.nfc.bytesToString(tag.ndefMessage[0].payload).substring(3);
    } else {
      this.referenceNumber = '';
    }
    if (tag.ndefMessage[1]) {
      this.tagDate  = this.nfc.bytesToString(tag.ndefMessage[1].payload).substring(3);
    } else {
      this.tagDate = '';
    }
    const text = 'Reference Number: ' + this.referenceNumber + '  Tag Date Written: ' + this.tagDate;
    this.alertMsg(text);
  }

  searchOnline(site, tag, device) {
    this.http.get(this.url + 'bluetooth-devices.php?siteID=' + site + '&tagID=' + tag + '&device=' + device).subscribe((res: any) => {
      console.log(res);
    });
  }
  searchQuery(site, tag, device, msg) {
    const deviceSql = 'SELECT * FROM fire_sp_template_device_loops_table WHERE site_id=? AND rftag=? AND addr=?';
      this.database.executeSql(deviceSql, [site, tag, device]).then((deviceRes: any) => {
      console.log(deviceRes.rows.length);
      if (deviceRes.rows.length > 0) {
        const result = deviceRes.rows.item(0);
        console.log(result);
      } else {
        console.log('No records found!');
      }
    }, err => {
     console.log(err);
    });
  }

  async scanListAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
  removeDevices() {
    this.devices = [];
    this.router.navigate(['/technician-menu/technician-dashboard']);
  }

  ionViewDidLeave(){
    this.readerMode.unsubscribe();
    this.devices = [];
    console.log('Leave clear array!');
  }

  ionViewWillLeave(){
   this.devices = [];
   console.log('Leave clear array222!');
  }

}
