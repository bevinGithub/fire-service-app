import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeReadWriteActuatorPageRoutingModule } from './smoke-read-write-actuator-routing.module';

import { SmokeReadWriteActuatorPage } from './smoke-read-write-actuator.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmokeReadWriteActuatorPageRoutingModule
  ],
  declarations: [SmokeReadWriteActuatorPage]
})
export class SmokeReadWriteActuatorPageModule {}
