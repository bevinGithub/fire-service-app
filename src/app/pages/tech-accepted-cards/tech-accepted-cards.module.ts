import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechAcceptedCardsPageRoutingModule } from './tech-accepted-cards-routing.module';

import { TechAcceptedCardsPage } from './tech-accepted-cards.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TechAcceptedCardsPageRoutingModule
  ],
  declarations: [TechAcceptedCardsPage]
})
export class TechAcceptedCardsPageModule {}
