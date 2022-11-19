import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StairPressurePage } from './stair-pressure.page';

const routes: Routes = [
  {
    path: '',
    component: StairPressurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StairPressurePageRoutingModule {}
