import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeReadWriteCurtainPageRoutingModule } from './smoke-read-write-curtain-routing.module';

import { SmokeReadWriteCurtainPage } from './smoke-read-write-curtain.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmokeReadWriteCurtainPageRoutingModule
  ],
  declarations: [SmokeReadWriteCurtainPage]
})
export class SmokeReadWriteCurtainPageModule {}
