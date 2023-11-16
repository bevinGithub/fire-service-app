import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeReadWritePanelPageRoutingModule } from './smoke-read-write-panel-routing.module';

import { SmokeReadWritePanelPage } from './smoke-read-write-panel.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmokeReadWritePanelPageRoutingModule
  ],
  declarations: [SmokeReadWritePanelPage]
})
export class SmokeReadWritePanelPageModule {}
