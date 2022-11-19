import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSiteFaultDetailsPage } from './view-site-fault-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSiteFaultDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSiteFaultDetailsPageRoutingModule {}
