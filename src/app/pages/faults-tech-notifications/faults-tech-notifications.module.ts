import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaultsTechNotificationsPageRoutingModule } from './faults-tech-notifications-routing.module';

import { FaultsTechNotificationsPage } from './faults-tech-notifications.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FaultsTechNotificationsPageRoutingModule
  ],
  declarations: [FaultsTechNotificationsPage]
})
export class FaultsTechNotificationsPageModule {}
