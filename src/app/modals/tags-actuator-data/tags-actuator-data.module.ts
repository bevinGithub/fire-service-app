import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagsActuatorDataPageRoutingModule } from './tags-actuator-data-routing.module';

import { TagsActuatorDataPage } from './tags-actuator-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsActuatorDataPageRoutingModule
  ],
  declarations: [TagsActuatorDataPage]
})
export class TagsActuatorDataPageModule {}
