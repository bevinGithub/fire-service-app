import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaultReportsListPage } from './fault-reports-list.page';

const routes: Routes = [
  {
    path: '',
    component: FaultReportsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaultReportsListPageRoutingModule {}
