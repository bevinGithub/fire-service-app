import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasValvesPage } from './gas-valves.page';

const routes: Routes = [
  {
    path: '',
    component: GasValvesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasValvesPageRoutingModule {}
