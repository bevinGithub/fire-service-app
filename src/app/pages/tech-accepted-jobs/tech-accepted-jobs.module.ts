import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechAcceptedJobsPageRoutingModule } from './tech-accepted-jobs-routing.module';

import { TechAcceptedJobsPage } from './tech-accepted-jobs.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TechAcceptedJobsPageRoutingModule
  ],
  declarations: [TechAcceptedJobsPage]
})
export class TechAcceptedJobsPageModule {}
