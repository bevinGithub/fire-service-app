import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStaffPageRoutingModule } from './edit-staff-routing.module';

import { EditStaffPage } from './edit-staff.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EditStaffPageRoutingModule
  ],
  declarations: [EditStaffPage]
})
export class EditStaffPageModule {}
