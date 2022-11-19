import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RollerShutterPage } from './roller-shutter.page';

const routes: Routes = [
  {
    path: '',
    component: RollerShutterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RollerShutterPageRoutingModule {}
