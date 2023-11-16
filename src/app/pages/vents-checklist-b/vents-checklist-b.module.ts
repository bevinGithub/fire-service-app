import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentsChecklistBPageRoutingModule } from './vents-checklist-b-routing.module';

import { VentsChecklistBPage } from './vents-checklist-b.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VentsChecklistBPageRoutingModule
  ],
  declarations: [VentsChecklistBPage]
})
export class VentsChecklistBPageModule {}
