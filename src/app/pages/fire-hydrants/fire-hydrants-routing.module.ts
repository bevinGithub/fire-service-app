import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireHydrantsPage } from './fire-hydrants.page';

const routes: Routes = [
  {
    path: '',
    component: FireHydrantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireHydrantsPageRoutingModule {}
