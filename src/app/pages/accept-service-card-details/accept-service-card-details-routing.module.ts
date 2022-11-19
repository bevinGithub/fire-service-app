import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptServiceCardDetailsPage } from './accept-service-card-details.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptServiceCardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptServiceCardDetailsPageRoutingModule {}
