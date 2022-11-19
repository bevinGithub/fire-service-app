import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditClientProfilePageRoutingModule } from './edit-client-profile-routing.module';

import { EditClientProfilePage } from './edit-client-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditClientProfilePageRoutingModule
  ],
  declarations: [EditClientProfilePage]
})
export class EditClientProfilePageModule {}
