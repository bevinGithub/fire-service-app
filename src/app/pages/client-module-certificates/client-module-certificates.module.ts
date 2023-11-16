import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientModuleCertificatesPageRoutingModule } from './client-module-certificates-routing.module';

import { ClientModuleCertificatesPage } from './client-module-certificates.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientModuleCertificatesPageRoutingModule
  ],
  declarations: [ClientModuleCertificatesPage]
})
export class ClientModuleCertificatesPageModule {}
