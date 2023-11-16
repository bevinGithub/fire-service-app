import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmokeReadWriteFanPage } from './smoke-read-write-fan.page';

describe('SmokeReadWriteFanPage', () => {
  let component: SmokeReadWriteFanPage;
  let fixture: ComponentFixture<SmokeReadWriteFanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmokeReadWriteFanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmokeReadWriteFanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
