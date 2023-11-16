import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewStaffSmokeDetailsPage } from './view-staff-smoke-details.page';

describe('ViewStaffSmokeDetailsPage', () => {
  let component: ViewStaffSmokeDetailsPage;
  let fixture: ComponentFixture<ViewStaffSmokeDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStaffSmokeDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewStaffSmokeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
