import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSiteJobsPage } from './view-site-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSiteJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSiteJobsPageRoutingModule {}
