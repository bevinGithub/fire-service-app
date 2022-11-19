import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreServiceCheckPageRoutingModule } from './pre-service-check-routing.module';

import { PreServiceCheckPage } from './pre-service-check.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PreServiceCheckPageRoutingModule
  ],
  declarations: [PreServiceCheckPage]
})
export class PreServiceCheckPageModule {}
