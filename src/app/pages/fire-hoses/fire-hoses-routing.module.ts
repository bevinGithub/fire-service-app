import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireHosesPage } from './fire-hoses.page';

const routes: Routes = [
  {
    path: '',
    component: FireHosesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireHosesPageRoutingModule {}
