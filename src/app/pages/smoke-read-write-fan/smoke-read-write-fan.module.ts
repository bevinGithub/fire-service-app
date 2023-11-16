import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeReadWriteFanPageRoutingModule } from './smoke-read-write-fan-routing.module';

import { SmokeReadWriteFanPage } from './smoke-read-write-fan.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmokeReadWriteFanPageRoutingModule
  ],
  declarations: [SmokeReadWriteFanPage]
})
export class SmokeReadWriteFanPageModule {}
