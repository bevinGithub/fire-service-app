import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoorHoldsPage } from './door-holds.page';

const routes: Routes = [
  {
    path: '',
    component: DoorHoldsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoorHoldsPageRoutingModule {}
