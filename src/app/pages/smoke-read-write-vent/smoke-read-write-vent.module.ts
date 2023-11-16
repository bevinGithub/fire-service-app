import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeReadWriteVentPageRoutingModule } from './smoke-read-write-vent-routing.module';

import { SmokeReadWriteVentPage } from './smoke-read-write-vent.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmokeReadWriteVentPageRoutingModule
  ],
  declarations: [SmokeReadWriteVentPage]
})
export class SmokeReadWriteVentPageModule {}
