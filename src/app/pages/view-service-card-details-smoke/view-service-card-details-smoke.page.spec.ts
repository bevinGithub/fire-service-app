import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewServiceCardDetailsSmokePage } from './view-service-card-details-smoke.page';

describe('ViewServiceCardDetailsSmokePage', () => {
  let component: ViewServiceCardDetailsSmokePage;
  let fixture: ComponentFixture<ViewServiceCardDetailsSmokePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewServiceCardDetailsSmokePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewServiceCardDetailsSmokePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
