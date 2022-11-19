import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingStructuresPage } from './building-structures.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingStructuresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingStructuresPageRoutingModule {}
