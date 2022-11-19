import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireHosesPageRoutingModule } from './fire-hoses-routing.module';

import { FireHosesPage } from './fire-hoses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireHosesPageRoutingModule
  ],
  declarations: [FireHosesPage]
})
export class FireHosesPageModule {}
