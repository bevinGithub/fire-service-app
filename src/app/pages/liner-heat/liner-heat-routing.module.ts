import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinerHeatPage } from './liner-heat.page';

const routes: Routes = [
  {
    path: '',
    component: LinerHeatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinerHeatPageRoutingModule {}
