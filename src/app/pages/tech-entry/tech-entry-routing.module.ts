import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechEntryPage } from './tech-entry.page';

const routes: Routes = [
  {
    path: '',
    component: TechEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechEntryPageRoutingModule {}
