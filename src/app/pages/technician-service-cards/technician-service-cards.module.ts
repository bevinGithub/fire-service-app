import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicianServiceCardsPageRoutingModule } from './technician-service-cards-routing.module';

import { TechnicianServiceCardsPage } from './technician-service-cards.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TechnicianServiceCardsPageRoutingModule
  ],
  declarations: [TechnicianServiceCardsPage]
})
export class TechnicianServiceCardsPageModule {}
