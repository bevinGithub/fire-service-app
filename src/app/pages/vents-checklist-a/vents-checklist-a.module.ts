import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentsChecklistAPageRoutingModule } from './vents-checklist-a-routing.module';

import { VentsChecklistAPage } from './vents-checklist-a.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VentsChecklistAPageRoutingModule
  ],
  declarations: [VentsChecklistAPage]
})
export class VentsChecklistAPageModule {}
