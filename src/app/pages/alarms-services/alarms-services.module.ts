import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmsServicesPageRoutingModule } from './alarms-services-routing.module';

import { AlarmsServicesPage } from './alarms-services.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AlarmsServicesPageRoutingModule
  ],
  declarations: [AlarmsServicesPage]
})
export class AlarmsServicesPageModule {}
