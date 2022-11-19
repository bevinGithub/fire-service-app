import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaultReportPageRoutingModule } from './fault-report-routing.module';

import { FaultReportPage } from './fault-report.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FaultReportPageRoutingModule
  ],
  declarations: [FaultReportPage]
})
export class FaultReportPageModule {}
