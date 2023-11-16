import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsCurtainDataPage } from './tags-curtain-data.page';

const routes: Routes = [
  {
    path: '',
    component: TagsCurtainDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsCurtainDataPageRoutingModule {}
