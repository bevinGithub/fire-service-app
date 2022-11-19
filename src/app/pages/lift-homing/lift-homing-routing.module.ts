import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiftHomingPage } from './lift-homing.page';

const routes: Routes = [
  {
    path: '',
    component: LiftHomingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiftHomingPageRoutingModule {}
