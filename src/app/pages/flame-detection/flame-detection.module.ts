import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlameDetectionPageRoutingModule } from './flame-detection-routing.module';

import { FlameDetectionPage } from './flame-detection.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FlameDetectionPageRoutingModule
  ],
  declarations: [FlameDetectionPage]
})
export class FlameDetectionPageModule {}
