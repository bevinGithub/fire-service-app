import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientModuleFaultsPage } from './client-module-faults.page';

const routes: Routes = [
  {
    path: '',
    component: ClientModuleFaultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientModuleFaultsPageRoutingModule {}
