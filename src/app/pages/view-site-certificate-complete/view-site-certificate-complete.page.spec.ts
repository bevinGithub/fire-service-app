import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSiteCertificateCompletePage } from './view-site-certificate-complete.page';

describe('ViewSiteCertificateCompletePage', () => {
  let component: ViewSiteCertificateCompletePage;
  let fixture: ComponentFixture<ViewSiteCertificateCompletePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSiteCertificateCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSiteCertificateCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
