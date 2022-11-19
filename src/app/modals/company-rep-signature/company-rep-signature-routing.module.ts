import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyRepSignaturePage } from './company-rep-signature.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyRepSignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRepSignaturePageRoutingModule {}
