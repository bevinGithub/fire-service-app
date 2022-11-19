import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiftPressurePageRoutingModule } from './lift-pressure-routing.module';

import { LiftPressurePage } from './lift-pressure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LiftPressurePageRoutingModule
  ],
  declarations: [LiftPressurePage]
})
export class LiftPressurePageModule {}
