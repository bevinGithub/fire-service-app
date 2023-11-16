import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechAcceptedCardsSmokePageRoutingModule } from './tech-accepted-cards-smoke-routing.module';

import { TechAcceptedCardsSmokePage } from './tech-accepted-cards-smoke.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TechAcceptedCardsSmokePageRoutingModule
  ],
  declarations: [TechAcceptedCardsSmokePage]
})
export class TechAcceptedCardsSmokePageModule {}
