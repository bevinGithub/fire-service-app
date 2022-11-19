import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientStaffPageRoutingModule } from './client-staff-routing.module';

import { ClientStaffPage } from './client-staff.page';

import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientStaffPageRoutingModule
  ],
  declarations: [ClientStaffPage]
})
export class ClientStaffPageModule {}
