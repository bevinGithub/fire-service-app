import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CookerHeadPageRoutingModule } from './cooker-head-routing.module';

import { CookerHeadPage } from './cooker-head.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CookerHeadPageRoutingModule
  ],
  declarations: [CookerHeadPage]
})
export class CookerHeadPageModule {}
