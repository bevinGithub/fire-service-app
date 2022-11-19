import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicianLoginPageRoutingModule } from './technician-login-routing.module';

import { TechnicianLoginPage } from './technician-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicianLoginPageRoutingModule
  ],
  declarations: [TechnicianLoginPage]
})
export class TechnicianLoginPageModule {}
