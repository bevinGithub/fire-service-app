import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewStaffSmokeDetailsPage } from './view-staff-smoke-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewStaffSmokeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewStaffSmokeDetailsPageRoutingModule {}
