import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicianJobCardsPageRoutingModule } from './technician-job-cards-routing.module';

import { TechnicianJobCardsPage } from './technician-job-cards.page';

import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TechnicianJobCardsPageRoutingModule
  ],
  declarations: [TechnicianJobCardsPage]
})
export class TechnicianJobCardsPageModule {}
