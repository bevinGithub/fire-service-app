import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagScanDataPage } from './tag-scan-data.page';

const routes: Routes = [
  {
    path: '',
    component: TagScanDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagScanDataPageRoutingModule {}
