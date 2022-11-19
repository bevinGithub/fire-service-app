import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobCardDetailsPageRoutingModule } from './job-card-details-routing.module';

import { JobCardDetailsPage } from './job-card-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    JobCardDetailsPageRoutingModule
  ],
  declarations: [JobCardDetailsPage]
})
export class JobCardDetailsPageModule {}
