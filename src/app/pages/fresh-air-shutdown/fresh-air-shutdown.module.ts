import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreshAirShutdownPageRoutingModule } from './fresh-air-shutdown-routing.module';

import { FreshAirShutdownPage } from './fresh-air-shutdown.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FreshAirShutdownPageRoutingModule
  ],
  declarations: [FreshAirShutdownPage]
})
export class FreshAirShutdownPageModule {}
