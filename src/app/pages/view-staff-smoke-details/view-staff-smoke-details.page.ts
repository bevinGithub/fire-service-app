import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-staff-smoke-details',
  templateUrl: './view-staff-smoke-details.page.html',
  styleUrls: ['./view-staff-smoke-details.page.scss'],
})
export class ViewStaffSmokeDetailsPage implements OnInit {
  service: any;
  url = environment.url;
  serviceID: any;
  site: any;
  tech: any;
  staff: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.serviceID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    console.log(this.serviceID);
    this.http.get(this.url + 'sp-get-staff-sc-details.php?id=' + this.serviceID).subscribe((data: any) => {
      console.log(data);
      this.service = data.certificate;
      this.site = data.site;
      this.tech = data.technician;
      this.staff = data.staff;
    });
  }

  ngOnInit() {
  }

}
