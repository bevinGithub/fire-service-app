import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceSummaryPageRoutingModule } from './service-summary-routing.module';

import { ServiceSummaryPage } from './service-summary.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    ServiceSummaryPageRoutingModule
  ],
  declarations: [ServiceSummaryPage]
})
export class ServiceSummaryPageModule {}
