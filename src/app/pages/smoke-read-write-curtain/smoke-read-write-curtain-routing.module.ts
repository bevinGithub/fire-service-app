import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeReadWriteCurtainPage } from './smoke-read-write-curtain.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeReadWriteCurtainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeReadWriteCurtainPageRoutingModule {}
