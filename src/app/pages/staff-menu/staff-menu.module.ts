import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffMenuPageRoutingModule } from './staff-menu-routing.module';

import { StaffMenuPage } from './staff-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffMenuPageRoutingModule
  ],
  declarations: [StaffMenuPage]
})
export class StaffMenuPageModule {}
