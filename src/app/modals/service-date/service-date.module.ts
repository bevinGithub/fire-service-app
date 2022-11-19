import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDatePageRoutingModule } from './service-date-routing.module';

import { ServiceDatePage } from './service-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceDatePageRoutingModule
  ],
  declarations: [ServiceDatePage]
})
export class ServiceDatePageModule {}
