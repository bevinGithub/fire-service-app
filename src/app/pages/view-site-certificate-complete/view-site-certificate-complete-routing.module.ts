import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSiteCertificateCompletePage } from './view-site-certificate-complete.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSiteCertificateCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSiteCertificateCompletePageRoutingModule {}
