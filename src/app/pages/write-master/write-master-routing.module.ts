import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteMasterPage } from './write-master.page';

const routes: Routes = [
  {
    path: '',
    component: WriteMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteMasterPageRoutingModule {}
