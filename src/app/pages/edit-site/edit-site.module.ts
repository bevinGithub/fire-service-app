import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSitePageRoutingModule } from './edit-site-routing.module';

import { EditSitePage } from './edit-site.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EditSitePageRoutingModule
  ],
  declarations: [EditSitePage]
})
export class EditSitePageModule {}
