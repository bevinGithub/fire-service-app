import { SharedModule } from './../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingStructuresPageRoutingModule } from './building-structures-routing.module';

import { BuildingStructuresPage } from './building-structures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BuildingStructuresPageRoutingModule
  ],
  declarations: [BuildingStructuresPage]
})
export class BuildingStructuresPageModule {}
