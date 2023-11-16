import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmokeReadWriteActuatorPage } from './smoke-read-write-actuator.page';

describe('SmokeReadWriteActuatorPage', () => {
  let component: SmokeReadWriteActuatorPage;
  let fixture: ComponentFixture<SmokeReadWriteActuatorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmokeReadWriteActuatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmokeReadWriteActuatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
