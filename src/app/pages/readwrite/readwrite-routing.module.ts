import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadwritePage } from './readwrite.page';

const routes: Routes = [
  {
    path: '',
    component: ReadwritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadwritePageRoutingModule {}
