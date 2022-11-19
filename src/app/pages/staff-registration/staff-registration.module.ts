import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffRegistrationPageRoutingModule } from './staff-registration-routing.module';

import { StaffRegistrationPage } from './staff-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffRegistrationPageRoutingModule
  ],
  declarations: [StaffRegistrationPage]
})
export class StaffRegistrationPageModule {}
