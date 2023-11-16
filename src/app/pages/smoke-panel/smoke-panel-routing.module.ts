import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokePanelPage } from './smoke-panel.page';

const routes: Routes = [
  {
    path: '',
    component: SmokePanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokePanelPageRoutingModule {}
