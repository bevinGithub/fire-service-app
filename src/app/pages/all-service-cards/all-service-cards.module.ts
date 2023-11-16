import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllServiceCardsPageRoutingModule } from './all-service-cards-routing.module';

import { AllServiceCardsPage } from './all-service-cards.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllServiceCardsPageRoutingModule
  ],
  declarations: [AllServiceCardsPage]
})
export class AllServiceCardsPageModule {}
