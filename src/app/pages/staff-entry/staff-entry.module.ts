import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffEntryPageRoutingModule } from './staff-entry-routing.module';

import { StaffEntryPage } from './staff-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffEntryPageRoutingModule
  ],
  declarations: [StaffEntryPage]
})
export class StaffEntryPageModule {}
