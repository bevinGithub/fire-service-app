import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagWritingPage } from './tag-writing.page';

const routes: Routes = [
  {
    path: '',
    component: TagWritingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagWritingPageRoutingModule {}
