import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechEntryPageRoutingModule } from './tech-entry-routing.module';

import { TechEntryPage } from './tech-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechEntryPageRoutingModule
  ],
  declarations: [TechEntryPage]
})
export class TechEntryPageModule {}
