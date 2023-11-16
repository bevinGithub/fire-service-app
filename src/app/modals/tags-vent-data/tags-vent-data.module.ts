import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagsVentDataPageRoutingModule } from './tags-vent-data-routing.module';

import { TagsVentDataPage } from './tags-vent-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsVentDataPageRoutingModule
  ],
  declarations: [TagsVentDataPage]
})
export class TagsVentDataPageModule {}
