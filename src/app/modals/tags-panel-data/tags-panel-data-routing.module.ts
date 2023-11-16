import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsPanelDataPage } from './tags-panel-data.page';

const routes: Routes = [
  {
    path: '',
    component: TagsPanelDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsPanelDataPageRoutingModule {}
