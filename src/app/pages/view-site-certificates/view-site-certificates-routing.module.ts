import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSiteCertificatesPage } from './view-site-certificates.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSiteCertificatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSiteCertificatesPageRoutingModule {}
