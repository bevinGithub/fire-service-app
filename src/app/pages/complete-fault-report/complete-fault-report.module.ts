import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteFaultReportPageRoutingModule } from './complete-fault-report-routing.module';

import { CompleteFaultReportPage } from './complete-fault-report.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CompleteFaultReportPageRoutingModule
  ],
  declarations: [CompleteFaultReportPage]
})
export class CompleteFaultReportPageModule {}
