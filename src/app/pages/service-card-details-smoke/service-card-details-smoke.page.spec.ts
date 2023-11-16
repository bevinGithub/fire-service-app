import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceCardDetailsSmokePage } from './service-card-details-smoke.page';

describe('ServiceCardDetailsSmokePage', () => {
  let component: ServiceCardDetailsSmokePage;
  let fixture: ComponentFixture<ServiceCardDetailsSmokePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCardDetailsSmokePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardDetailsSmokePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
