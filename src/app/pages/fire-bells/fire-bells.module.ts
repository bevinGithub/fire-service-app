import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireBellsPageRoutingModule } from './fire-bells-routing.module';

import { FireBellsPage } from './fire-bells.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireBellsPageRoutingModule
  ],
  declarations: [FireBellsPage]
})
export class FireBellsPageModule {}
