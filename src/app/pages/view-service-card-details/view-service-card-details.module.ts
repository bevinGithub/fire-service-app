import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewServiceCardDetailsPageRoutingModule } from './view-service-card-details-routing.module';

import { ViewServiceCardDetailsPage } from './view-service-card-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewServiceCardDetailsPageRoutingModule
  ],
  declarations: [ViewServiceCardDetailsPage]
})
export class ViewServiceCardDetailsPageModule {}
