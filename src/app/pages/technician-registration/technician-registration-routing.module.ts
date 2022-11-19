import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianRegistrationPage } from './technician-registration.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicianRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianRegistrationPageRoutingModule {}
