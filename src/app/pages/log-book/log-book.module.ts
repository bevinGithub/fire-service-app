import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogBookPageRoutingModule } from './log-book-routing.module';

import { LogBookPage } from './log-book.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LogBookPageRoutingModule
  ],
  declarations: [LogBookPage]
})
export class LogBookPageModule {}
