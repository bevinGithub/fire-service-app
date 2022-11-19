import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleKnockPageRoutingModule } from './single-knock-routing.module';

import { SingleKnockPage } from './single-knock.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SingleKnockPageRoutingModule
  ],
  declarations: [SingleKnockPage]
})
export class SingleKnockPageModule {}
