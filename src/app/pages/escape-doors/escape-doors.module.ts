import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscapeDoorsPageRoutingModule } from './escape-doors-routing.module';

import { EscapeDoorsPage } from './escape-doors.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EscapeDoorsPageRoutingModule
  ],
  declarations: [EscapeDoorsPage]
})
export class EscapeDoorsPageModule {}
