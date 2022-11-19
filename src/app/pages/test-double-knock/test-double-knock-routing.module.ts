import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestDoubleKnockPage } from './test-double-knock.page';

const routes: Routes = [
  {
    path: '',
    component: TestDoubleKnockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestDoubleKnockPageRoutingModule {}
