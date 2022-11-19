import { NgModule } from '@angular/core';
import { FooterComponent } from  '../components/footer/footer.component';
import { StaffFooterComponent } from './staff-footer/staff-footer.component';
import { TechFooterComponent } from './tech-footer/tech-footer.component';

@NgModule({
  declarations: [FooterComponent, StaffFooterComponent, TechFooterComponent],
  exports: [FooterComponent, StaffFooterComponent, TechFooterComponent]
})

export class SharedModule{}
