import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaultReportsPageRoutingModule } from './fault-reports-routing.module';

import { FaultReportsPage } from './fault-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaultReportsPageRoutingModule
  ],
  declarations: [FaultReportsPage]
})
export class FaultReportsPageModule {}
