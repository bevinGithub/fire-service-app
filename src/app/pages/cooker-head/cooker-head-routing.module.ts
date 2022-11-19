import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookerHeadPage } from './cooker-head.page';

const routes: Routes = [
  {
    path: '',
    component: CookerHeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookerHeadPageRoutingModule {}
