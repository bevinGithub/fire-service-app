import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientCertificatesPageRoutingModule } from './view-client-certificates-routing.module';

import { ViewClientCertificatesPage } from './view-client-certificates.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewClientCertificatesPageRoutingModule
  ],
  declarations: [ViewClientCertificatesPage]
})
export class ViewClientCertificatesPageModule {}
