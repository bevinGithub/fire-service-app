import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeWritePanelPageRoutingModule } from './smoke-write-panel-routing.module';

import { SmokeWritePanelPage } from './smoke-write-panel.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmokeWritePanelPageRoutingModule
  ],
  declarations: [SmokeWritePanelPage]
})
export class SmokeWritePanelPageModule {}
