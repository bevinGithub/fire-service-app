import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSitePage } from './edit-site.page';

const routes: Routes = [
  {
    path: '',
    component: EditSitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSitePageRoutingModule {}
