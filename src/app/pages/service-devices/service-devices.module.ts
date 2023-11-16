import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDevicesPageRoutingModule } from './service-devices-routing.module';

import { ServiceDevicesPage } from './service-devices.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServiceDevicesPageRoutingModule
  ],
  declarations: [ServiceDevicesPage]
})
export class ServiceDevicesPageModule {}
