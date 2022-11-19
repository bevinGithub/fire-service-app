import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeExtractionPageRoutingModule } from './smoke-extraction-routing.module';

import { SmokeExtractionPage } from './smoke-extraction.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmokeExtractionPageRoutingModule
  ],
  declarations: [SmokeExtractionPage]
})
export class SmokeExtractionPageModule {}
