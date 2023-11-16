import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewServiceCardDetailsSmokePage } from './view-service-card-details-smoke.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServiceCardDetailsSmokePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewServiceCardDetailsSmokePageRoutingModule {}
