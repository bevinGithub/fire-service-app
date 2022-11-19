import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RollerShutterPageRoutingModule } from './roller-shutter-routing.module';

import { RollerShutterPage } from './roller-shutter.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RollerShutterPageRoutingModule
  ],
  declarations: [RollerShutterPage]
})
export class RollerShutterPageModule {}
