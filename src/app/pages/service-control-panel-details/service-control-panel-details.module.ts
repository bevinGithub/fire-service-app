import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceControlPanelDetailsPageRoutingModule } from './service-control-panel-details-routing.module';

import { ServiceControlPanelDetailsPage } from './service-control-panel-details.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ServiceControlPanelDetailsPageRoutingModule
  ],
  declarations: [ServiceControlPanelDetailsPage]
})
export class ServiceControlPanelDetailsPageModule {}
