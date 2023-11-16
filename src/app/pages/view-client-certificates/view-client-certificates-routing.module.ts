import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewClientCertificatesPage } from './view-client-certificates.page';

const routes: Routes = [
  {
    path: '',
    component: ViewClientCertificatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewClientCertificatesPageRoutingModule {}
