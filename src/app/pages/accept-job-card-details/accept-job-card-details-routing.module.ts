import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptJobCardDetailsPage } from './accept-job-card-details.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptJobCardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptJobCardDetailsPageRoutingModule {}
