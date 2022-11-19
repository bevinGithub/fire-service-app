import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateTechnicianPageRoutingModule } from './rate-technician-routing.module';

import { RateTechnicianPage } from './rate-technician.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RateTechnicianPageRoutingModule
  ],
  declarations: [RateTechnicianPage]
})
export class RateTechnicianPageModule {}
