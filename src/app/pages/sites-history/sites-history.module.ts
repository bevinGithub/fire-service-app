import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitesHistoryPageRoutingModule } from './sites-history-routing.module';

import { SitesHistoryPage } from './sites-history.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SitesHistoryPageRoutingModule
  ],
  declarations: [SitesHistoryPage]
})
export class SitesHistoryPageModule {}
