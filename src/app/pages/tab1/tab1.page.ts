import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AndroidGattTransportMode, BluetoothLE } from '@awesome-cordova-plugins/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  output: string;

  isScanning: boolean;
  address: string;
  services: any = false;
  scanSub: Subscription | undefined = undefined;
  constructor(
    private bluetoothLE: BluetoothLE,
    private changeDetectorRef: ChangeDetectorRef,
    private platform: Platform
  ) {
    this.output = 'Output:';
    this.isScanning = false;
    this.address = '';
    this.platform.ready().then(async () => {
      this.output += `<br>Platform ready.`;
      this.changeDetectorRef.detectChanges();

      await new Promise((resolve, reject) => {
        this.bluetoothLE.initialize().subscribe({
          next: resolve,
          error: reject
        });
      });
      this.output += `<br>Bluetooth initialized.`;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {
  }

  async startScan() {
    this.bluetoothLE.startScan({}).subscribe({
      next: (next) => {
        this.output += `<br><br>Scan:<br>${JSON.stringify(next)}`;
        if (next.name === 'FSA') {
          this.address = next.address;
          this.stopScan();
        }
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        this.output += `<br><br>Scan error: ${JSON.stringify(error)}`;
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
        this.output += `<br><br>Connect:<br>${JSON.stringify(next)}`
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        this.output += `<br><br>Connect error:<br>${JSON.stringify(error)}`
        this.changeDetectorRef.detectChanges();
      },
      complete: () => this.output += `<br>Connect complete.`,
    });
  }

  async disconnect() {
    try {
      const result = await this.bluetoothLE.disconnect({ address: this.address });
      this.output += `<br><br>Disconnect:<br>${JSON.stringify(result)}`
    }
    catch (error) {
      this.output += `<br><br>Disconnect error:<br>${JSON.stringify(error)}`
    }

  }

  async reconnect() {
    this.bluetoothLE.reconnect({
      address: this.address,
    }).subscribe({
      next: (next) => {
        this.output += `<br><br>Reconnect:<br>${JSON.stringify(next)}`
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        this.output += `<br><br>Reconnect error:<br>${JSON.stringify(error)}`
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
      this.output += `<br><br>Discover:<br>${JSON.stringify(next)}`
      if (Array.isArray(next.services)) {
        for (const service of next.services) {
          this.output += `<br><br>Service:<br>${JSON.stringify(service)}`
        }
      }
      this.services = next.services;
      this.changeDetectorRef.detectChanges();
    }).catch((error) => {
      this.output += `<br><br>Discover error:<br>${JSON.stringify(error)}`
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
            decoded_value: atob(readResult.value) // Decode from base64
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
      this.output += `<br><br>Write:<br>${JSON.stringify(result)}`
      this.changeDetectorRef.detectChanges();
    }
    catch (error) {
      this.output += `<br><br>Write error:<br>${JSON.stringify(error)}`
      this.changeDetectorRef.detectChanges();
    }
  }

}
