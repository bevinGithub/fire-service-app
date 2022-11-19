import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasValvesPageRoutingModule } from './gas-valves-routing.module';

import { GasValvesPage } from './gas-valves.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GasValvesPageRoutingModule
  ],
  declarations: [GasValvesPage]
})
export class GasValvesPageModule {}
