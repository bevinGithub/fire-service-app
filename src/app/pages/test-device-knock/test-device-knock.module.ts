import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestDeviceKnockPageRoutingModule } from './test-device-knock-routing.module';

import { TestDeviceKnockPage } from './test-device-knock.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    TestDeviceKnockPageRoutingModule
  ],
  declarations: [TestDeviceKnockPage]
})
export class TestDeviceKnockPageModule {}
