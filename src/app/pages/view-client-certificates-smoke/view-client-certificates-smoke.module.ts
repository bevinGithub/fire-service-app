import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientCertificatesSmokePageRoutingModule } from './view-client-certificates-smoke-routing.module';

import { ViewClientCertificatesSmokePage } from './view-client-certificates-smoke.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewClientCertificatesSmokePageRoutingModule
  ],
  declarations: [ViewClientCertificatesSmokePage]
})
export class ViewClientCertificatesSmokePageModule {}
