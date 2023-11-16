import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewStaffFaultPage } from './view-staff-fault.page';

const routes: Routes = [
  {
    path: '',
    component: ViewStaffFaultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewStaffFaultPageRoutingModule {}
