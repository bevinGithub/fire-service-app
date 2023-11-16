import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechSelectedModulesPage } from './tech-selected-modules.page';

const routes: Routes = [
  {
    path: '',
    component: TechSelectedModulesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechSelectedModulesPageRoutingModule {}
