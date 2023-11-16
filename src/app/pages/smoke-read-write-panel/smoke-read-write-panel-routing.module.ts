import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeReadWritePanelPage } from './smoke-read-write-panel.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeReadWritePanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeReadWritePanelPageRoutingModule {}
