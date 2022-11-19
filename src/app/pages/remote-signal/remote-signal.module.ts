import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoteSignalPageRoutingModule } from './remote-signal-routing.module';

import { RemoteSignalPage } from './remote-signal.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RemoteSignalPageRoutingModule
  ],
  declarations: [RemoteSignalPage]
})
export class RemoteSignalPageModule {}
