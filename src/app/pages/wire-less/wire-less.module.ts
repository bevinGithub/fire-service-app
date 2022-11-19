import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WireLessPageRoutingModule } from './wire-less-routing.module';

import { WireLessPage } from './wire-less.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    WireLessPageRoutingModule
  ],
  declarations: [WireLessPage]
})
export class WireLessPageModule {}
