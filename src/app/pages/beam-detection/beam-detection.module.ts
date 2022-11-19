import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeamDetectionPageRoutingModule } from './beam-detection-routing.module';

import { BeamDetectionPage } from './beam-detection.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BeamDetectionPageRoutingModule
  ],
  declarations: [BeamDetectionPage]
})
export class BeamDetectionPageModule {}
