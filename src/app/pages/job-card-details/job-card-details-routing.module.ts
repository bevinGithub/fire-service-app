import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobCardDetailsPage } from './job-card-details.page';

const routes: Routes = [
  {
    path: '',
    component: JobCardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobCardDetailsPageRoutingModule {}
