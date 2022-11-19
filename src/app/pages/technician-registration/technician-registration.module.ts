import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicianRegistrationPageRoutingModule } from './technician-registration-routing.module';

import { TechnicianRegistrationPage } from './technician-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicianRegistrationPageRoutingModule
  ],
  declarations: [TechnicianRegistrationPage]
})
export class TechnicianRegistrationPageModule {}
