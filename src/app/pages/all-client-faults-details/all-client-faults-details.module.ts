import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllClientFaultsDetailsPageRoutingModule } from './all-client-faults-details-routing.module';

import { AllClientFaultsDetailsPage } from './all-client-faults-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllClientFaultsDetailsPageRoutingModule
  ],
  declarations: [AllClientFaultsDetailsPage]
})
export class AllClientFaultsDetailsPageModule {}
