import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaultsFireNotifiationsPage } from './faults-fire-notifiations.page';

describe('FaultsFireNotifiationsPage', () => {
  let component: FaultsFireNotifiationsPage;
  let fixture: ComponentFixture<FaultsFireNotifiationsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultsFireNotifiationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaultsFireNotifiationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
