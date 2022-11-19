import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSiteFaultsCompletePageRoutingModule } from './view-site-faults-complete-routing.module';

import { ViewSiteFaultsCompletePage } from './view-site-faults-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewSiteFaultsCompletePageRoutingModule
  ],
  declarations: [ViewSiteFaultsCompletePage]
})
export class ViewSiteFaultsCompletePageModule {}
