import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaultReportPage } from './fault-report.page';

const routes: Routes = [
  {
    path: '',
    component: FaultReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaultReportPageRoutingModule {}
