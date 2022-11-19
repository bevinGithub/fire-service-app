import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WireLessPage } from './wire-less.page';

const routes: Routes = [
  {
    path: '',
    component: WireLessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WireLessPageRoutingModule {}
