import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceClientSignaturePageRoutingModule } from './service-client-signature-routing.module';

import { ServiceClientSignaturePage } from './service-client-signature.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServiceClientSignaturePageRoutingModule
  ],
  declarations: [ServiceClientSignaturePage]
})
export class ServiceClientSignaturePageModule {}
