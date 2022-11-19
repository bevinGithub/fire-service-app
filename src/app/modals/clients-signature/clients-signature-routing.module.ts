import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsSignaturePage } from './clients-signature.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsSignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsSignaturePageRoutingModule {}
