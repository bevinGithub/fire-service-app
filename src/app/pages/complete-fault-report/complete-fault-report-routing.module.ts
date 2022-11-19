import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteFaultReportPage } from './complete-fault-report.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteFaultReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteFaultReportPageRoutingModule {}
