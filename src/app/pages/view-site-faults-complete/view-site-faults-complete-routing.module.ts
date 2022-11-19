import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSiteFaultsCompletePage } from './view-site-faults-complete.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSiteFaultsCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSiteFaultsCompletePageRoutingModule {}
