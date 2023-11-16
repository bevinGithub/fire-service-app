import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeWritePanelPage } from './smoke-write-panel.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeWritePanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeWritePanelPageRoutingModule {}
