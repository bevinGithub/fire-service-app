import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmokeReadWriteVentPage } from './smoke-read-write-vent.page';

describe('SmokeReadWriteVentPage', () => {
  let component: SmokeReadWriteVentPage;
  let fixture: ComponentFixture<SmokeReadWriteVentPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmokeReadWriteVentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmokeReadWriteVentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
