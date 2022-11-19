import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagsDataPageRoutingModule } from './tags-data-routing.module';

import { TagsDataPage } from './tags-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsDataPageRoutingModule
  ],
  declarations: [TagsDataPage]
})
export class TagsDataPageModule {}
