import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokePanelPageRoutingModule } from './smoke-panel-routing.module';

import { SmokePanelPage } from './smoke-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmokePanelPageRoutingModule
  ],
  declarations: [SmokePanelPage]
})
export class SmokePanelPageModule {}
