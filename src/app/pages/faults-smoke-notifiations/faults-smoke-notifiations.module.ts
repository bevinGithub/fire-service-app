import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaultsSmokeNotifiationsPageRoutingModule } from './faults-smoke-notifiations-routing.module';

import { FaultsSmokeNotifiationsPage } from './faults-smoke-notifiations.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FaultsSmokeNotifiationsPageRoutingModule
  ],
  declarations: [FaultsSmokeNotifiationsPage]
})
export class FaultsSmokeNotifiationsPageModule {}
