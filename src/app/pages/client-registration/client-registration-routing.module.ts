import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientRegistrationPage } from './client-registration.page';

const routes: Routes = [
  {
    path: '',
    component: ClientRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRegistrationPageRoutingModule {}
