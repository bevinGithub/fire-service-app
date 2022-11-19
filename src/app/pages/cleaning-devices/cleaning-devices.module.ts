import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CleaningDevicesPageRoutingModule } from './cleaning-devices-routing.module';

import { CleaningDevicesPage } from './cleaning-devices.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    CleaningDevicesPageRoutingModule
  ],
  declarations: [CleaningDevicesPage]
})
export class CleaningDevicesPageModule {}
