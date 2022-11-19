import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianLoginPage } from './technician-login.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicianLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianLoginPageRoutingModule {}
