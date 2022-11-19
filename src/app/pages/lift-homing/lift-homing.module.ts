import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiftHomingPageRoutingModule } from './lift-homing-routing.module';

import { LiftHomingPage } from './lift-homing.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LiftHomingPageRoutingModule
  ],
  declarations: [LiftHomingPage]
})
export class LiftHomingPageModule {}
