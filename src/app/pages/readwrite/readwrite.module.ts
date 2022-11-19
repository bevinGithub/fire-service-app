import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadwritePageRoutingModule } from './readwrite-routing.module';

import { ReadwritePage } from './readwrite.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReadwritePageRoutingModule
  ],
  declarations: [ReadwritePage]
})
export class ReadwritePageModule {}
