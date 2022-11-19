import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffActivationPageRoutingModule } from './staff-activation-routing.module';

import { StaffActivationPage } from './staff-activation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffActivationPageRoutingModule
  ],
  declarations: [StaffActivationPage]
})
export class StaffActivationPageModule {}
