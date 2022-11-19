import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewServiceRequestPageRoutingModule } from './view-service-request-routing.module';

import { ViewServiceRequestPage } from './view-service-request.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewServiceRequestPageRoutingModule
  ],
  declarations: [ViewServiceRequestPage]
})
export class ViewServiceRequestPageModule {}
