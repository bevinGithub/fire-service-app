import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientServiceTypePageRoutingModule } from './client-service-type-routing.module';

import { ClientServiceTypePage } from './client-service-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientServiceTypePageRoutingModule
  ],
  declarations: [ClientServiceTypePage]
})
export class ClientServiceTypePageModule {}
