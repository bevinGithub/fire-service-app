import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireAlarmsPageRoutingModule } from './fire-alarms-routing.module';

import { FireAlarmsPage } from './fire-alarms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireAlarmsPageRoutingModule
  ],
  declarations: [FireAlarmsPage]
})
export class FireAlarmsPageModule {}
