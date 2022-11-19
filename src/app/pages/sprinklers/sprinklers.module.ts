import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SprinklersPageRoutingModule } from './sprinklers-routing.module';

import { SprinklersPage } from './sprinklers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SprinklersPageRoutingModule
  ],
  declarations: [SprinklersPage]
})
export class SprinklersPageModule {}
