import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagScanDataPageRoutingModule } from './tag-scan-data-routing.module';

import { TagScanDataPage } from './tag-scan-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagScanDataPageRoutingModule
  ],
  declarations: [TagScanDataPage]
})
export class TagScanDataPageModule {}
