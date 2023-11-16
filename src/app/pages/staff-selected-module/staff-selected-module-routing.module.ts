import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffSelectedModulePage } from './staff-selected-module.page';

const routes: Routes = [
  {
    path: '',
    component: StaffSelectedModulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffSelectedModulePageRoutingModule {}
