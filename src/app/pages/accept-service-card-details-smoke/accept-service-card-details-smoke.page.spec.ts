import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptServiceCardDetailsSmokePage } from './accept-service-card-details-smoke.page';

describe('AcceptServiceCardDetailsSmokePage', () => {
  let component: AcceptServiceCardDetailsSmokePage;
  let fixture: ComponentFixture<AcceptServiceCardDetailsSmokePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptServiceCardDetailsSmokePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptServiceCardDetailsSmokePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
