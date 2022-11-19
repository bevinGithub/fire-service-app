import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmsFaultReportsPageRoutingModule } from './alarms-fault-reports-routing.module';

import { AlarmsFaultReportsPage } from './alarms-fault-reports.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AlarmsFaultReportsPageRoutingModule
  ],
  declarations: [AlarmsFaultReportsPage]
})
export class AlarmsFaultReportsPageModule {}
