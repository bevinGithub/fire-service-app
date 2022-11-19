import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsDataPage } from './tags-data.page';

const routes: Routes = [
  {
    path: '',
    component: TagsDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsDataPageRoutingModule {}
