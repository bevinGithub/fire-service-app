import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientServiceTypePage } from './client-service-type.page';

const routes: Routes = [
  {
    path: '',
    component: ClientServiceTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientServiceTypePageRoutingModule {}
