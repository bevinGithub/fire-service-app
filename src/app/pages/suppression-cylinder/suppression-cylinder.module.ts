import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuppressionCylinderPageRoutingModule } from './suppression-cylinder-routing.module';

import { SuppressionCylinderPage } from './suppression-cylinder.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SuppressionCylinderPageRoutingModule
  ],
  declarations: [SuppressionCylinderPage]
})
export class SuppressionCylinderPageModule {}
