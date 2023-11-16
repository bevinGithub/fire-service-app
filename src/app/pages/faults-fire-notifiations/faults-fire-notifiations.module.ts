import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaultsFireNotifiationsPageRoutingModule } from './faults-fire-notifiations-routing.module';

import { FaultsFireNotifiationsPage } from './faults-fire-notifiations.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FaultsFireNotifiationsPageRoutingModule
  ],
  declarations: [FaultsFireNotifiationsPage]
})
export class FaultsFireNotifiationsPageModule {}
