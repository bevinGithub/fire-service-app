import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoorHoldsPageRoutingModule } from './door-holds-routing.module';

import { DoorHoldsPage } from './door-holds.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DoorHoldsPageRoutingModule
  ],
  declarations: [DoorHoldsPage]
})
export class DoorHoldsPageModule {}
