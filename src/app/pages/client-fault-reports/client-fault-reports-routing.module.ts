import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientFaultReportsPage } from './client-fault-reports.page';

const routes: Routes = [
  {
    path: '',
    component: ClientFaultReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientFaultReportsPageRoutingModule {}
