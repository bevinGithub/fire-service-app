import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewStaffFaultPageRoutingModule } from './view-staff-fault-routing.module';

import { ViewStaffFaultPage } from './view-staff-fault.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewStaffFaultPageRoutingModule
  ],
  declarations: [ViewStaffFaultPage]
})
export class ViewStaffFaultPageModule {}
