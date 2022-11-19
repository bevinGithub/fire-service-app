import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptJobCardDetailsPageRoutingModule } from './accept-job-card-details-routing.module';

import { AcceptJobCardDetailsPage } from './accept-job-card-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AcceptJobCardDetailsPageRoutingModule
  ],
  declarations: [AcceptJobCardDetailsPage]
})
export class AcceptJobCardDetailsPageModule {}
