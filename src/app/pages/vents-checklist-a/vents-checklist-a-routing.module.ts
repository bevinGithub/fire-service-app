import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentsChecklistAPage } from './vents-checklist-a.page';

const routes: Routes = [
  {
    path: '',
    component: VentsChecklistAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentsChecklistAPageRoutingModule {}
