import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountActivationPageRoutingModule } from './account-activation-routing.module';

import { AccountActivationPage } from './account-activation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountActivationPageRoutingModule
  ],
  declarations: [AccountActivationPage]
})
export class AccountActivationPageModule {}
