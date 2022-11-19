import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PadPageRoutingModule } from './pad-routing.module';

import { PadPage } from './pad.page';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    SignaturePadModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PadPageRoutingModule
  ],
  declarations: [PadPage]
})
export class PadPageModule {}
