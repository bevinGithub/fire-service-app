import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewRejectedServiceCertificatePage } from './view-rejected-service-certificate.page';

describe('ViewRejectedServiceCertificatePage', () => {
  let component: ViewRejectedServiceCertificatePage;
  let fixture: ComponentFixture<ViewRejectedServiceCertificatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRejectedServiceCertificatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRejectedServiceCertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
