import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllClientFaultsPage } from './all-client-faults.page';

const routes: Routes = [
  {
    path: '',
    component: AllClientFaultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllClientFaultsPageRoutingModule {}
