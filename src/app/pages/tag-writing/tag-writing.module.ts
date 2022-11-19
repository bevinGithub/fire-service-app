import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagWritingPageRoutingModule } from './tag-writing-routing.module';

import { TagWritingPage } from './tag-writing.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TagWritingPageRoutingModule
  ],
  declarations: [TagWritingPage]
})
export class TagWritingPageModule {}
