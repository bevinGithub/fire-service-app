import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceCardDetailsPageRoutingModule } from './service-card-details-routing.module';

import { ServiceCardDetailsPage } from './service-card-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServiceCardDetailsPageRoutingModule
  ],
  declarations: [ServiceCardDetailsPage]
})
export class ServiceCardDetailsPageModule {}
