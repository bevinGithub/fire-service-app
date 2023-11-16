import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewStaffSmokeDetailsPageRoutingModule } from './view-staff-smoke-details-routing.module';

import { ViewStaffSmokeDetailsPage } from './view-staff-smoke-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewStaffSmokeDetailsPageRoutingModule
  ],
  declarations: [ViewStaffSmokeDetailsPage]
})
export class ViewStaffSmokeDetailsPageModule {}
