import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoorMonitorPageRoutingModule } from './door-monitor-routing.module';

import { DoorMonitorPage } from './door-monitor.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DoorMonitorPageRoutingModule
  ],
  declarations: [DoorMonitorPage]
})
export class DoorMonitorPageModule {}
