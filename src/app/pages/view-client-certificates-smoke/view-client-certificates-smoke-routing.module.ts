import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewClientCertificatesSmokePage } from './view-client-certificates-smoke.page';

const routes: Routes = [
  {
    path: '',
    component: ViewClientCertificatesSmokePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewClientCertificatesSmokePageRoutingModule {}
