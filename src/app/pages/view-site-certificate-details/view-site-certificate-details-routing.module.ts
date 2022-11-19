import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSiteCertificateDetailsPage } from './view-site-certificate-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSiteCertificateDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSiteCertificateDetailsPageRoutingModule {}
