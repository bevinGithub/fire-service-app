import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoEvacuationPageRoutingModule } from './auto-evacuation-routing.module';

import { AutoEvacuationPage } from './auto-evacuation.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AutoEvacuationPageRoutingModule
  ],
  declarations: [AutoEvacuationPage]
})
export class AutoEvacuationPageModule {}
