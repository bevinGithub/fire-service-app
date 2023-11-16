import { TechFooter2Component } from './tech-footer2/tech-footer2.component';
import { FooterClientComponent } from './footer-client/footer-client.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from  '../components/footer/footer.component';
import { StaffFooterComponent } from './staff-footer/staff-footer.component';
import { TechFooterComponent } from './tech-footer/tech-footer.component';
import { StaffFooter2Component } from './staff-footer2/staff-footer2.component';

@NgModule({
  // eslint-disable-next-line max-len
  declarations: [FooterComponent, FooterClientComponent, StaffFooter2Component, StaffFooterComponent, TechFooterComponent,TechFooter2Component],
  exports: [FooterComponent, FooterClientComponent, StaffFooter2Component, StaffFooterComponent, TechFooterComponent,TechFooter2Component]
})

export class SharedModule{}
