import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestSitePageRoutingModule } from './request-site-routing.module';

import { RequestSitePage } from './request-site.page';

import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RequestSitePageRoutingModule
  ],
  declarations: [RequestSitePage]
})
export class RequestSitePageModule {}
