import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffDashboardPageRoutingModule } from './staff-dashboard-routing.module';

import { StaffDashboardPage } from './staff-dashboard.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StaffDashboardPageRoutingModule
  ],
  declarations: [StaffDashboardPage]
})
export class StaffDashboardPageModule {}
