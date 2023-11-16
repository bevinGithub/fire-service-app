import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechSelectedModulesPageRoutingModule } from './tech-selected-modules-routing.module';

import { TechSelectedModulesPage } from './tech-selected-modules.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TechSelectedModulesPageRoutingModule
  ],
  declarations: [TechSelectedModulesPage]
})
export class TechSelectedModulesPageModule {}
