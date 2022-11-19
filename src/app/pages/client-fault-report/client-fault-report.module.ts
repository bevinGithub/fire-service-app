import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientFaultReportPageRoutingModule } from './client-fault-report-routing.module';

import { ClientFaultReportPage } from './client-fault-report.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientFaultReportPageRoutingModule
  ],
  declarations: [ClientFaultReportPage]
})
export class ClientFaultReportPageModule {}
