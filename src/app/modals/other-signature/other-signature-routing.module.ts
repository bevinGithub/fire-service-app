import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherSignaturePage } from './other-signature.page';

const routes: Routes = [
  {
    path: '',
    component: OtherSignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherSignaturePageRoutingModule {}
