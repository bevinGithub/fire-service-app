import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherSignaturePageRoutingModule } from './other-signature-routing.module';

import { OtherSignaturePage } from './other-signature.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OtherSignaturePageRoutingModule
  ],
  declarations: [OtherSignaturePage]
})
export class OtherSignaturePageModule {}
