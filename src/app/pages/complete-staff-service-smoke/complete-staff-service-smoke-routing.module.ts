import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteStaffServiceSmokePage } from './complete-staff-service-smoke.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteStaffServiceSmokePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteStaffServiceSmokePageRoutingModule {}
