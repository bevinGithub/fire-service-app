import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentsChecklistBPage } from './vents-checklist-b.page';

const routes: Routes = [
  {
    path: '',
    component: VentsChecklistBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentsChecklistBPageRoutingModule {}
