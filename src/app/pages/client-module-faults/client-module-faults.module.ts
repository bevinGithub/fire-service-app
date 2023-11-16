import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientModuleFaultsPageRoutingModule } from './client-module-faults-routing.module';

import { ClientModuleFaultsPage } from './client-module-faults.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientModuleFaultsPageRoutingModule
  ],
  declarations: [ClientModuleFaultsPage]
})
export class ClientModuleFaultsPageModule {}
