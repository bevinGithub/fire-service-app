import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceCardDetailsSmokePageRoutingModule } from './service-card-details-smoke-routing.module';

import { ServiceCardDetailsSmokePage } from './service-card-details-smoke.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServiceCardDetailsSmokePageRoutingModule
  ],
  declarations: [ServiceCardDetailsSmokePage]
})
export class ServiceCardDetailsSmokePageModule {}
