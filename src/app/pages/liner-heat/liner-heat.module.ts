import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinerHeatPageRoutingModule } from './liner-heat-routing.module';

import { LinerHeatPage } from './liner-heat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LinerHeatPageRoutingModule
  ],
  declarations: [LinerHeatPage]
})
export class LinerHeatPageModule {}
