import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FansChecklistPageRoutingModule } from './fans-checklist-routing.module';

import { FansChecklistPage } from './fans-checklist.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FansChecklistPageRoutingModule
  ],
  declarations: [FansChecklistPage]
})
export class FansChecklistPageModule {}
