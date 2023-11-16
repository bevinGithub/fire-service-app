import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurtainsChecklistPage } from './curtains-checklist.page';

const routes: Routes = [
  {
    path: '',
    component: CurtainsChecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurtainsChecklistPageRoutingModule {}
