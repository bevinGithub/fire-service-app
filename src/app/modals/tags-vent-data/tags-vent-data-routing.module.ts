import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsVentDataPage } from './tags-vent-data.page';

const routes: Routes = [
  {
    path: '',
    component: TagsVentDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsVentDataPageRoutingModule {}
