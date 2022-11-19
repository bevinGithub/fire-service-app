import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientFaultReportsPageRoutingModule } from './client-fault-reports-routing.module';

import { ClientFaultReportsPage } from './client-fault-reports.page';

import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientFaultReportsPageRoutingModule
  ],
  declarations: [ClientFaultReportsPage]
})
export class ClientFaultReportsPageModule {}
