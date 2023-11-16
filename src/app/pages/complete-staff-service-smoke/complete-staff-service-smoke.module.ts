import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteStaffServiceSmokePageRoutingModule } from './complete-staff-service-smoke-routing.module';

import { CompleteStaffServiceSmokePage } from './complete-staff-service-smoke.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CompleteStaffServiceSmokePageRoutingModule
  ],
  declarations: [CompleteStaffServiceSmokePage]
})
export class CompleteStaffServiceSmokePageModule {}
