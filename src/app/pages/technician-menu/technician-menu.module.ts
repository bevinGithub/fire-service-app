import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicianMenuPageRoutingModule } from './technician-menu-routing.module';

import { TechnicianMenuPage } from './technician-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicianMenuPageRoutingModule
  ],
  declarations: [TechnicianMenuPage]
})
export class TechnicianMenuPageModule {}
