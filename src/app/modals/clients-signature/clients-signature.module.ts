import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsSignaturePageRoutingModule } from './clients-signature-routing.module';

import { ClientsSignaturePage } from './clients-signature.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientsSignaturePageRoutingModule
  ],
  declarations: [ClientsSignaturePage]
})
export class ClientsSignaturePageModule {}
