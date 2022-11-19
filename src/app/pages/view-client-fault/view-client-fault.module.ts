import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientFaultPageRoutingModule } from './view-client-fault-routing.module';

import { ViewClientFaultPage } from './view-client-fault.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ViewClientFaultPageRoutingModule
  ],
  declarations: [ViewClientFaultPage]
})
export class ViewClientFaultPageModule {}
