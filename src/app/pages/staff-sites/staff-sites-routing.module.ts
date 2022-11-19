import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffSitesPage } from './staff-sites.page';

const routes: Routes = [
  {
    path: '',
    component: StaffSitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffSitesPageRoutingModule {}
