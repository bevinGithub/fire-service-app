import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagReadingPage } from './tag-reading.page';

const routes: Routes = [
  {
    path: '',
    component: TagReadingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagReadingPageRoutingModule {}
