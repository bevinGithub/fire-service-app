import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptServiceCardDetailsSmokePageRoutingModule } from './accept-service-card-details-smoke-routing.module';

import { AcceptServiceCardDetailsSmokePage } from './accept-service-card-details-smoke.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AcceptServiceCardDetailsSmokePageRoutingModule
  ],
  declarations: [AcceptServiceCardDetailsSmokePage]
})
export class AcceptServiceCardDetailsSmokePageModule {}
