import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallPointsPageRoutingModule } from './call-points-routing.module';

import { CallPointsPage } from './call-points.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CallPointsPageRoutingModule
  ],
  declarations: [CallPointsPage]
})
export class CallPointsPageModule {}
