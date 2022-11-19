import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewServiceRequestPage } from './view-service-request.page';

const routes: Routes = [
  {
    path: '',
    component: ViewServiceRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewServiceRequestPageRoutingModule {}
