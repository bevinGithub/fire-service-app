import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactLoggedinPageRoutingModule } from './contact-loggedin-routing.module';

import { ContactLoggedinPage } from './contact-loggedin.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ContactLoggedinPageRoutingModule
  ],
  declarations: [ContactLoggedinPage]
})
export class ContactLoggedinPageModule {}
