import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffActivationPage } from './staff-activation.page';

const routes: Routes = [
  {
    path: '',
    component: StaffActivationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffActivationPageRoutingModule {}
