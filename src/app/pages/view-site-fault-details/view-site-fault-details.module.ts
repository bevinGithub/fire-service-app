import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSiteFaultDetailsPageRoutingModule } from './view-site-fault-details-routing.module';

import { ViewSiteFaultDetailsPage } from './view-site-fault-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewSiteFaultDetailsPageRoutingModule
  ],
  declarations: [ViewSiteFaultDetailsPage]
})
export class ViewSiteFaultDetailsPageModule {}
