import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewJobCardDetailsPageRoutingModule } from './view-job-card-details-routing.module';

import { ViewJobCardDetailsPage } from './view-job-card-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewJobCardDetailsPageRoutingModule
  ],
  declarations: [ViewJobCardDetailsPage]
})
export class ViewJobCardDetailsPageModule {}
