import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestCameraPageRoutingModule } from './test-camera-routing.module';

import { TestCameraPage } from './test-camera.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TestCameraPageRoutingModule
  ],
  declarations: [TestCameraPage]
})
export class TestCameraPageModule {}
