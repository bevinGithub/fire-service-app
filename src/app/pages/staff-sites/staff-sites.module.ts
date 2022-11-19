import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffSitesPageRoutingModule } from './staff-sites-routing.module';

import { StaffSitesPage } from './staff-sites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffSitesPageRoutingModule
  ],
  declarations: [StaffSitesPage]
})
export class StaffSitesPageModule {}
