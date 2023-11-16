import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagsPanelDataPageRoutingModule } from './tags-panel-data-routing.module';

import { TagsPanelDataPage } from './tags-panel-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsPanelDataPageRoutingModule
  ],
  declarations: [TagsPanelDataPage]
})
export class TagsPanelDataPageModule {}
