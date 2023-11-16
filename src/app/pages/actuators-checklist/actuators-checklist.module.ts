import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActuatorsChecklistPageRoutingModule } from './actuators-checklist-routing.module';

import { ActuatorsChecklistPage } from './actuators-checklist.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ActuatorsChecklistPageRoutingModule
  ],
  declarations: [ActuatorsChecklistPage]
})
export class ActuatorsChecklistPageModule {}
