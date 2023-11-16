import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@awesome-cordova-plugins/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  output = 'Output:';
  isPlatformReady: boolean;
  subBluetoothInit: Subscription | undefined = undefined;
  subPeripheralInit: Subscription | undefined = undefined;

  peripheralData: {
    uuid: string;
    name: string;
    value: string;
  }[] = [
      {
        name: 'siteID',
        uuid: 'd6da1884-7d0e-11ed-a1eb-0242ac120002', // Arbitrary UUID
        value: '18',
      },
      {
        uuid: 'da4da86e-7d0e-11ed-a1eb-0242ac120002',
        name: 'Tag Number',
        value: '1069'
      },
      {
        uuid: 'dd8b3d0c-7d0e-11ed-a1eb-0242ac120002',
        name: 'Device Number',
        value: '1101'
      },
    ];

  constructor(
    private bluetoothLE: BluetoothLE,
    private changeDetectorRef: ChangeDetectorRef,
    private platform: Platform
  ) {
    this.isPlatformReady = false;
    this.platform.ready().then(async () => {
      this.isPlatformReady = true;
      this.print(`<br>Platform ready.`);
      this.bluetoothLE.requestPermission().then((result: any) => {
        console.log(result);
      }, err => {
        console.log(err);
      });
    });
   }

  ngOnInit() {
  }

  print(text: string) {
    this.output += text;
    this.changeDetectorRef.detectChanges();
  }

  async bluetoothInit() {
    this.print(`<br>bluetoothInit()... invoked.`);

    this.subBluetoothInit = this.bluetoothLE.initialize({
      request: true,
      statusReceiver: true
    }).subscribe({
      next: (event) => {
        this.print(`<br><br>Bluetooth init:<br>${JSON.stringify(event)}`);
        if (event.status === 'enabled') {
          this.peripheralInit();
        }
      },
      error: (error) => { this.print(`<br><br>Bluetooth error:<br>${JSON.stringify(error)}`); },
      complete: () => { this.print(`<br><br>Bluetooth complete.`); },
    });
  }

  async peripheralInit() {
    this.print(`<br>peripheralInit()... invoked.`);

    this.subPeripheralInit = this.bluetoothLE.initializePeripheral({
      request: true,
    }).subscribe({
      next: (event) => {
        this.print(`<br><br>Peripheral value:<br>${JSON.stringify(event)}.`);
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
            characteristic.value = atob(event.value); // Decode base64
            this.respondReadRequest(event.requestId, event.address, characteristic.value);
            break;
          }
        }
      },
      error: error => {
        this.print(`<br><br>Peripheral error:<br>${JSON.stringify(error)}.`);
      },
      complete: () => {
        this.print(`<br><br>Peripheral complete.`);
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
      this.print(`<br><br>Read responded:<br>${JSON.stringify(responded)}`);
    }
    catch (error) {
      this.print(`<br><br>Read response error:<br>${JSON.stringify(error)}`);
    }
  }

  async addService() {
    this.print(`<br><br>addService() invoked.`);

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
      this.print(`<br><br>Service added:<br>${JSON.stringify(service)}`);

    }
    catch (error) {
      this.print(`<br><br>Service error: ${JSON.stringify(error)}.`);
    }
  }

  async advertise() {
    this.output += `<br><br>advertise(...) invoked.`;
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
      this.print(`<br><br>Advertising started:<br>${JSON.stringify(advertisement)}`);
    }
    catch (error) {
      this.print(`<br><br>Advertising error: ${JSON.stringify(error)}.`);
    }
  }
}
