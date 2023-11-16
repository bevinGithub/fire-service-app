import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceCardDetailsSmokePage } from './service-card-details-smoke.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceCardDetailsSmokePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceCardDetailsSmokePageRoutingModule {}
