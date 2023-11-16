import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientModuleCertificatesPage } from './client-module-certificates.page';

const routes: Routes = [
  {
    path: '',
    component: ClientModuleCertificatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientModuleCertificatesPageRoutingModule {}
