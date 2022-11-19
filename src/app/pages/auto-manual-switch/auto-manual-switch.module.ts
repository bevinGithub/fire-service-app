import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoManualSwitchPageRoutingModule } from './auto-manual-switch-routing.module';

import { AutoManualSwitchPage } from './auto-manual-switch.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AutoManualSwitchPageRoutingModule
  ],
  declarations: [AutoManualSwitchPage]
})
export class AutoManualSwitchPageModule {}
