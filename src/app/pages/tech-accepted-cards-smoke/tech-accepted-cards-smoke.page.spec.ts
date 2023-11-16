import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechAcceptedCardsSmokePage } from './tech-accepted-cards-smoke.page';

describe('TechAcceptedCardsSmokePage', () => {
  let component: TechAcceptedCardsSmokePage;
  let fixture: ComponentFixture<TechAcceptedCardsSmokePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechAcceptedCardsSmokePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechAcceptedCardsSmokePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
