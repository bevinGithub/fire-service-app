import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptServiceCardDetailsPageRoutingModule } from './accept-service-card-details-routing.module';

import { AcceptServiceCardDetailsPage } from './accept-service-card-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AcceptServiceCardDetailsPageRoutingModule
  ],
  declarations: [AcceptServiceCardDetailsPage]
})
export class AcceptServiceCardDetailsPageModule {}
