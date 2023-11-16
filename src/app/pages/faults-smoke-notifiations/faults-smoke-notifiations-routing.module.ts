import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaultsSmokeNotifiationsPage } from './faults-smoke-notifiations.page';

const routes: Routes = [
  {
    path: '',
    component: FaultsSmokeNotifiationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaultsSmokeNotifiationsPageRoutingModule {}
