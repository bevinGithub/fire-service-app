import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaultReportsListPageRoutingModule } from './fault-reports-list-routing.module';

import { FaultReportsListPage } from './fault-reports-list.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FaultReportsListPageRoutingModule
  ],
  declarations: [FaultReportsListPage]
})
export class FaultReportsListPageModule {}
