import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechAcceptedJobsPage } from './tech-accepted-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: TechAcceptedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechAcceptedJobsPageRoutingModule {}
