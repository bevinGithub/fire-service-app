import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiftPressurePage } from './lift-pressure.page';

const routes: Routes = [
  {
    path: '',
    component: LiftPressurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiftPressurePageRoutingModule {}
