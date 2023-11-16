import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedModulePageRoutingModule } from './selected-module-routing.module';

import { SelectedModulePage } from './selected-module.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SelectedModulePageRoutingModule
  ],
  declarations: [SelectedModulePage]
})
export class SelectedModulePageModule {}
