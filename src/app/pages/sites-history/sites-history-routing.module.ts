import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitesHistoryPage } from './sites-history.page';

const routes: Routes = [
  {
    path: '',
    component: SitesHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitesHistoryPageRoutingModule {}
