import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewServiceCardDetailsSmokePageRoutingModule } from './view-service-card-details-smoke-routing.module';

import { ViewServiceCardDetailsSmokePage } from './view-service-card-details-smoke.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewServiceCardDetailsSmokePageRoutingModule
  ],
  declarations: [ViewServiceCardDetailsSmokePage]
})
export class ViewServiceCardDetailsSmokePageModule {}
