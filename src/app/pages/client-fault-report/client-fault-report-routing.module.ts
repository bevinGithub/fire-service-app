import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientFaultReportPage } from './client-fault-report.page';

const routes: Routes = [
  {
    path: '',
    component: ClientFaultReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientFaultReportPageRoutingModule {}
