import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientStaffPage } from './client-staff.page';

const routes: Routes = [
  {
    path: '',
    component: ClientStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientStaffPageRoutingModule {}
