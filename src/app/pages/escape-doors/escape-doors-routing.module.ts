import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscapeDoorsPage } from './escape-doors.page';

const routes: Routes = [
  {
    path: '',
    component: EscapeDoorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscapeDoorsPageRoutingModule {}
