import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSiteCertificatesPageRoutingModule } from './view-site-certificates-routing.module';

import { ViewSiteCertificatesPage } from './view-site-certificates.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewSiteCertificatesPageRoutingModule
  ],
  declarations: [ViewSiteCertificatesPage]
})
export class ViewSiteCertificatesPageModule {}
