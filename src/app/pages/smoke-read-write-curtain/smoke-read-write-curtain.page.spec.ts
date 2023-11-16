import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmokeReadWriteCurtainPage } from './smoke-read-write-curtain.page';

describe('SmokeReadWriteCurtainPage', () => {
  let component: SmokeReadWriteCurtainPage;
  let fixture: ComponentFixture<SmokeReadWriteCurtainPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmokeReadWriteCurtainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmokeReadWriteCurtainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
