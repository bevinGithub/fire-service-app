import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicianDashboardPageRoutingModule } from './technician-dashboard-routing.module';

import { TechnicianDashboardPage } from './technician-dashboard.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TechnicianDashboardPageRoutingModule
  ],
  declarations: [TechnicianDashboardPage]
})
export class TechnicianDashboardPageModule {}
