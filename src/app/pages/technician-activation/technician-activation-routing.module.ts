import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianActivationPage } from './technician-activation.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicianActivationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianActivationPageRoutingModule {}
