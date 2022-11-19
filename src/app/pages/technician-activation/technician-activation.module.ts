import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicianActivationPageRoutingModule } from './technician-activation-routing.module';

import { TechnicianActivationPage } from './technician-activation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicianActivationPageRoutingModule
  ],
  declarations: [TechnicianActivationPage]
})
export class TechnicianActivationPageModule {}
