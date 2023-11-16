import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurtainsChecklistPageRoutingModule } from './curtains-checklist-routing.module';

import { CurtainsChecklistPage } from './curtains-checklist.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CurtainsChecklistPageRoutingModule
  ],
  declarations: [CurtainsChecklistPage]
})
export class CurtainsChecklistPageModule {}
