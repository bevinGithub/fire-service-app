import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceCardDetailsPage } from './service-card-details.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceCardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceCardDetailsPageRoutingModule {}
