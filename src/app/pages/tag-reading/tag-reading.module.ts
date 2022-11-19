import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagReadingPageRoutingModule } from './tag-reading-routing.module';

import { TagReadingPage } from './tag-reading.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TagReadingPageRoutingModule
  ],
  declarations: [TagReadingPage]
})
export class TagReadingPageModule {}
