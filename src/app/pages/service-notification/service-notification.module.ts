import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceNotificationPageRoutingModule } from './service-notification-routing.module';

import { ServiceNotificationPage } from './service-notification.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServiceNotificationPageRoutingModule
  ],
  declarations: [ServiceNotificationPage]
})
export class ServiceNotificationPageModule {}
