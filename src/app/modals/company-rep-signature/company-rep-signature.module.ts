import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyRepSignaturePageRoutingModule } from './company-rep-signature-routing.module';

import { CompanyRepSignaturePage } from './company-rep-signature.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CompanyRepSignaturePageRoutingModule
  ],
  declarations: [CompanyRepSignaturePage]
})
export class CompanyRepSignaturePageModule {}
