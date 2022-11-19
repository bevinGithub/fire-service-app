import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoundersFunctionalPageRoutingModule } from './sounders-functional-routing.module';

import { SoundersFunctionalPage } from './sounders-functional.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SoundersFunctionalPageRoutingModule
  ],
  declarations: [SoundersFunctionalPage]
})
export class SoundersFunctionalPageModule {}
