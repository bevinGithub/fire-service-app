import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientSitesPageRoutingModule } from './client-sites-routing.module';

import { ClientSitesPage } from './client-sites.page';

import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ClientSitesPageRoutingModule
  ],
  declarations: [ClientSitesPage]
})
export class ClientSitesPageModule {}
