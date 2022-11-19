import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoubleKnockPageRoutingModule } from './double-knock-routing.module';

import { DoubleKnockPage } from './double-knock.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DoubleKnockPageRoutingModule
  ],
  declarations: [DoubleKnockPage]
})
export class DoubleKnockPageModule {}
