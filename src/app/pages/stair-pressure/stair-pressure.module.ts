import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StairPressurePageRoutingModule } from './stair-pressure-routing.module';

import { StairPressurePage } from './stair-pressure.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StairPressurePageRoutingModule
  ],
  declarations: [StairPressurePage]
})
export class StairPressurePageModule {}
