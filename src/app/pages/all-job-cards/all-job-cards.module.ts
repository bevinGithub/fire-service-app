import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllJobCardsPageRoutingModule } from './all-job-cards-routing.module';

import { AllJobCardsPage } from './all-job-cards.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllJobCardsPageRoutingModule
  ],
  declarations: [AllJobCardsPage]
})
export class AllJobCardsPageModule {}
