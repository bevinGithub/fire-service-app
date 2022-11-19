import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRejectedServiceCertificatePage } from './view-rejected-service-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRejectedServiceCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRejectedServiceCertificatePageRoutingModule {}
