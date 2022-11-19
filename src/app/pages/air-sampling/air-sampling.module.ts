import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirSamplingPageRoutingModule } from './air-sampling-routing.module';

import { AirSamplingPage } from './air-sampling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AirSamplingPageRoutingModule
  ],
  declarations: [AirSamplingPage]
})
export class AirSamplingPageModule {}
