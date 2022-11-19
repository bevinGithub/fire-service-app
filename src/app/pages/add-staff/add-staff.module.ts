import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStaffPageRoutingModule } from './add-staff-routing.module';

import { AddStaffPage } from './add-staff.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AddStaffPageRoutingModule
  ],
  declarations: [AddStaffPage]
})
export class AddStaffPageModule {}
