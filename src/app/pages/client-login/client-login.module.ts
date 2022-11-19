import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientLoginPageRoutingModule } from './client-login-routing.module';

import { ClientLoginPage } from './client-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientLoginPageRoutingModule
  ],
  declarations: [ClientLoginPage]
})
export class ClientLoginPageModule {}
