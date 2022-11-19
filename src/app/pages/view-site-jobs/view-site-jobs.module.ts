import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSiteJobsPageRoutingModule } from './view-site-jobs-routing.module';

import { ViewSiteJobsPage } from './view-site-jobs.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewSiteJobsPageRoutingModule
  ],
  declarations: [ViewSiteJobsPage]
})
export class ViewSiteJobsPageModule {}
