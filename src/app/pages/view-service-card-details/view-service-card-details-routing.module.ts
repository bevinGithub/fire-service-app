import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewServiceCardDetailsPage } from './view-service-card-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServiceCardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewServiceCardDetailsPageRoutingModule {}
