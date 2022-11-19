import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestDoubleKnockPageRoutingModule } from './test-double-knock-routing.module';

import { TestDoubleKnockPage } from './test-double-knock.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TestDoubleKnockPageRoutingModule
  ],
  declarations: [TestDoubleKnockPage]
})
export class TestDoubleKnockPageModule {}
