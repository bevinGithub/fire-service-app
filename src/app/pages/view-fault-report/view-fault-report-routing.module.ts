import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFaultReportPage } from './view-fault-report.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFaultReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFaultReportPageRoutingModule {}
