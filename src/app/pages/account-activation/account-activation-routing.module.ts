import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountActivationPage } from './account-activation.page';

const routes: Routes = [
  {
    path: '',
    component: AccountActivationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountActivationPageRoutingModule {}
