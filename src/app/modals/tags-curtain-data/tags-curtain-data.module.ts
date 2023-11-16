import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagsCurtainDataPageRoutingModule } from './tags-curtain-data-routing.module';

import { TagsCurtainDataPage } from './tags-curtain-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsCurtainDataPageRoutingModule
  ],
  declarations: [TagsCurtainDataPage]
})
export class TagsCurtainDataPageModule {}
