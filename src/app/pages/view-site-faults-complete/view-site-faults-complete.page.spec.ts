import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSiteFaultsCompletePage } from './view-site-faults-complete.page';

describe('ViewSiteFaultsCompletePage', () => {
  let component: ViewSiteFaultsCompletePage;
  let fixture: ComponentFixture<ViewSiteFaultsCompletePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSiteFaultsCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSiteFaultsCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
