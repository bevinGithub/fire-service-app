import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllClientFaultsDetailsPage } from './all-client-faults-details.page';

const routes: Routes = [
  {
    path: '',
    component: AllClientFaultsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllClientFaultsDetailsPageRoutingModule {}
