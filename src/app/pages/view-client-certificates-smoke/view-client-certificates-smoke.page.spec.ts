import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewClientCertificatesSmokePage } from './view-client-certificates-smoke.page';

describe('ViewClientCertificatesSmokePage', () => {
  let component: ViewClientCertificatesSmokePage;
  let fixture: ComponentFixture<ViewClientCertificatesSmokePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClientCertificatesSmokePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewClientCertificatesSmokePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
