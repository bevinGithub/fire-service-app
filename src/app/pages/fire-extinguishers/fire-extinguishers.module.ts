import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireExtinguishersPageRoutingModule } from './fire-extinguishers-routing.module';

import { FireExtinguishersPage } from './fire-extinguishers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireExtinguishersPageRoutingModule
  ],
  declarations: [FireExtinguishersPage]
})
export class FireExtinguishersPageModule {}
