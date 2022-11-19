import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireHydrantsPageRoutingModule } from './fire-hydrants-routing.module';

import { FireHydrantsPage } from './fire-hydrants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireHydrantsPageRoutingModule
  ],
  declarations: [FireHydrantsPage]
})
export class FireHydrantsPageModule {}
