import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaultsSmokeNotifiationsPage } from './faults-smoke-notifiations.page';

describe('FaultsSmokeNotifiationsPage', () => {
  let component: FaultsSmokeNotifiationsPage;
  let fixture: ComponentFixture<FaultsSmokeNotifiationsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultsSmokeNotifiationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaultsSmokeNotifiationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
