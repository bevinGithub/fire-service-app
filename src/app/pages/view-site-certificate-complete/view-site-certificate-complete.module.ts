import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSiteCertificateCompletePageRoutingModule } from './view-site-certificate-complete-routing.module';

import { ViewSiteCertificateCompletePage } from './view-site-certificate-complete.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewSiteCertificateCompletePageRoutingModule
  ],
  declarations: [ViewSiteCertificateCompletePage]
})
export class ViewSiteCertificateCompletePageModule {}
