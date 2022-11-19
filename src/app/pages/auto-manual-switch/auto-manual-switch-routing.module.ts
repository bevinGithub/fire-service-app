import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoManualSwitchPage } from './auto-manual-switch.page';

const routes: Routes = [
  {
    path: '',
    component: AutoManualSwitchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoManualSwitchPageRoutingModule {}
