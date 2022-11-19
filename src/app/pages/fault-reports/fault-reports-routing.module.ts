import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaultReportsPage } from './fault-reports.page';

const routes: Routes = [
  {
    path: '',
    component: FaultReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaultReportsPageRoutingModule {}
