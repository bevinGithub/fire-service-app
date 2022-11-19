import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianDashboardPage } from './technician-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicianDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianDashboardPageRoutingModule {}
