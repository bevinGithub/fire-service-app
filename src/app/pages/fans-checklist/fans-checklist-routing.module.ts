import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FansChecklistPage } from './fans-checklist.page';

const routes: Routes = [
  {
    path: '',
    component: FansChecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FansChecklistPageRoutingModule {}
