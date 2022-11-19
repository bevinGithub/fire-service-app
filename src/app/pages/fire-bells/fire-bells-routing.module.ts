import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireBellsPage } from './fire-bells.page';

const routes: Routes = [
  {
    path: '',
    component: FireBellsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireBellsPageRoutingModule {}
