import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFaultReportPageRoutingModule } from './view-fault-report-routing.module';

import { ViewFaultReportPage } from './view-fault-report.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewFaultReportPageRoutingModule
  ],
  declarations: [ViewFaultReportPage]
})
export class ViewFaultReportPageModule {}
