import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmokeReadWritePanelPage } from './smoke-read-write-panel.page';

describe('SmokeReadWritePanelPage', () => {
  let component: SmokeReadWritePanelPage;
  let fixture: ComponentFixture<SmokeReadWritePanelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmokeReadWritePanelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmokeReadWritePanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
