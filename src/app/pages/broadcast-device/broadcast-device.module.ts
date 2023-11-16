import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BroadcastDevicePageRoutingModule } from './broadcast-device-routing.module';

import { BroadcastDevicePage } from './broadcast-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BroadcastDevicePageRoutingModule
  ],
  declarations: [BroadcastDevicePage]
})
export class BroadcastDevicePageModule {}
