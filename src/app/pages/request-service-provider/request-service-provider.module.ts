import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestServiceProviderPageRoutingModule } from './request-service-provider-routing.module';

import { RequestServiceProviderPage } from './request-service-provider.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RequestServiceProviderPageRoutingModule
  ],
  declarations: [RequestServiceProviderPage]
})
export class RequestServiceProviderPageModule {}
