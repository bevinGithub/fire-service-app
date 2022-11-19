import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteServiceHistoryPageRoutingModule } from './complete-service-history-routing.module';

import { CompleteServiceHistoryPage } from './complete-service-history.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CompleteServiceHistoryPageRoutingModule
  ],
  declarations: [CompleteServiceHistoryPage]
})
export class CompleteServiceHistoryPageModule {}
