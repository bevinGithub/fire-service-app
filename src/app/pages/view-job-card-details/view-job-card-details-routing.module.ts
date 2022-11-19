import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewJobCardDetailsPage } from './view-job-card-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewJobCardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewJobCardDetailsPageRoutingModule {}
