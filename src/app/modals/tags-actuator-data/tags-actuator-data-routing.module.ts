import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsActuatorDataPage } from './tags-actuator-data.page';

const routes: Routes = [
  {
    path: '',
    component: TagsActuatorDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsActuatorDataPageRoutingModule {}
