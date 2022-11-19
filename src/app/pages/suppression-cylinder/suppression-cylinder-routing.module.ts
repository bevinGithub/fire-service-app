import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuppressionCylinderPage } from './suppression-cylinder.page';

const routes: Routes = [
  {
    path: '',
    component: SuppressionCylinderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuppressionCylinderPageRoutingModule {}
