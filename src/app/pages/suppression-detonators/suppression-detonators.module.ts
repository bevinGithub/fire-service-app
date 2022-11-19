import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuppressionDetonatorsPageRoutingModule } from './suppression-detonators-routing.module';

import { SuppressionDetonatorsPage } from './suppression-detonators.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SuppressionDetonatorsPageRoutingModule
  ],
  declarations: [SuppressionDetonatorsPage]
})
export class SuppressionDetonatorsPageModule {}
