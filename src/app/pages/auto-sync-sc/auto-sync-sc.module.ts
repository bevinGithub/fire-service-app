import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoSyncSCPageRoutingModule } from './auto-sync-sc-routing.module';

import { AutoSyncSCPage } from './auto-sync-sc.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AutoSyncSCPageRoutingModule
  ],
  declarations: [AutoSyncSCPage]
})
export class AutoSyncSCPageModule {}
