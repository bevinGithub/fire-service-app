import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallPointsPage } from './call-points.page';

const routes: Routes = [
  {
    path: '',
    component: CallPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallPointsPageRoutingModule {}
