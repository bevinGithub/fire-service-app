import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcShutdownPage } from './ac-shutdown.page';

const routes: Routes = [
  {
    path: '',
    component: AcShutdownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcShutdownPageRoutingModule {}
