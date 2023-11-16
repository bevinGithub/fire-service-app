import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActuatorsChecklistPage } from './actuators-checklist.page';

const routes: Routes = [
  {
    path: '',
    component: ActuatorsChecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActuatorsChecklistPageRoutingModule {}
