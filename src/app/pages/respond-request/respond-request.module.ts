import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespondRequestPageRoutingModule } from './respond-request-routing.module';

import { RespondRequestPage } from './respond-request.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RespondRequestPageRoutingModule
  ],
  declarations: [RespondRequestPage]
})
export class RespondRequestPageModule {}
