import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptServiceCardDetailsSmokePage } from './accept-service-card-details-smoke.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptServiceCardDetailsSmokePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptServiceCardDetailsSmokePageRoutingModule {}
