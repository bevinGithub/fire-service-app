import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagsFanDataPageRoutingModule } from './tags-fan-data-routing.module';

import { TagsFanDataPage } from './tags-fan-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsFanDataPageRoutingModule
  ],
  declarations: [TagsFanDataPage]
})
export class TagsFanDataPageModule {}
