import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRejectedServiceCertificatePageRoutingModule } from './view-rejected-service-certificate-routing.module';

import { ViewRejectedServiceCertificatePage } from './view-rejected-service-certificate.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewRejectedServiceCertificatePageRoutingModule
  ],
  declarations: [ViewRejectedServiceCertificatePage]
})
export class ViewRejectedServiceCertificatePageModule {}
