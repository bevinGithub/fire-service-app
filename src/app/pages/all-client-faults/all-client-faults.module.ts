import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllClientFaultsPageRoutingModule } from './all-client-faults-routing.module';

import { AllClientFaultsPage } from './all-client-faults.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllClientFaultsPageRoutingModule
  ],
  declarations: [AllClientFaultsPage]
})
export class AllClientFaultsPageModule {}
