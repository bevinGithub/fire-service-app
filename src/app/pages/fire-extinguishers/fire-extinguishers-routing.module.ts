import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireExtinguishersPage } from './fire-extinguishers.page';

const routes: Routes = [
  {
    path: '',
    component: FireExtinguishersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireExtinguishersPageRoutingModule {}
