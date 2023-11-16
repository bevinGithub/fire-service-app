import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteStaffServiceSmokePage } from './complete-staff-service-smoke.page';

describe('CompleteStaffServiceSmokePage', () => {
  let component: CompleteStaffServiceSmokePage;
  let fixture: ComponentFixture<CompleteStaffServiceSmokePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteStaffServiceSmokePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteStaffServiceSmokePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
