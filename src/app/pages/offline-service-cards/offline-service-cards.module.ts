import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfflineServiceCardsPageRoutingModule } from './offline-service-cards-routing.module';

import { OfflineServiceCardsPage } from './offline-service-cards.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OfflineServiceCardsPageRoutingModule
  ],
  declarations: [OfflineServiceCardsPage]
})
export class OfflineServiceCardsPageModule {}
