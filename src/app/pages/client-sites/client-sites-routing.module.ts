import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSitesPage } from './client-sites.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSitesPageRoutingModule {}
