import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanDevicesPageRoutingModule } from './scan-devices-routing.module';

import { ScanDevicesPage } from './scan-devices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanDevicesPageRoutingModule
  ],
  declarations: [ScanDevicesPage]
})
export class ScanDevicesPageModule {}
