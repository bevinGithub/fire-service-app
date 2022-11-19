import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuppressionDetonatorsPage } from './suppression-detonators.page';

const routes: Routes = [
  {
    path: '',
    component: SuppressionDetonatorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuppressionDetonatorsPageRoutingModule {}
