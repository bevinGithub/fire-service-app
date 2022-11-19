import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSiteCertificateDetailsPageRoutingModule } from './view-site-certificate-details-routing.module';

import { ViewSiteCertificateDetailsPage } from './view-site-certificate-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewSiteCertificateDetailsPageRoutingModule
  ],
  declarations: [ViewSiteCertificateDetailsPage]
})
export class ViewSiteCertificateDetailsPageModule {}
