import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestServiceProviderPage } from './request-service-provider.page';

const routes: Routes = [
  {
    path: '',
    component: RequestServiceProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestServiceProviderPageRoutingModule {}
