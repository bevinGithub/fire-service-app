import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmokeVentilationPageRoutingModule } from './smoke-ventilation-routing.module';

import { SmokeVentilationPage } from './smoke-ventilation.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SmokeVentilationPageRoutingModule
  ],
  declarations: [SmokeVentilationPage]
})
export class SmokeVentilationPageModule {}
