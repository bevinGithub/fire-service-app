import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientProfilePageRoutingModule } from './client-profile-routing.module';

import { ClientProfilePage } from './client-profile.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientProfilePageRoutingModule
  ],
  declarations: [ClientProfilePage]
})
export class ClientProfilePageModule {}
