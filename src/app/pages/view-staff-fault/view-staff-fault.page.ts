import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-staff-fault',
  templateUrl: './view-staff-fault.page.html',
  styleUrls: ['./view-staff-fault.page.scss'],
})
export class ViewStaffFaultPage implements OnInit {
  fault: any;
  url = environment.url;
  faultID: any;
  reviews: any;
  user: any;
  site: any;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.faultID = this.activatedRoute.snapshot.paramMap.get('faultID');
    console.log(this.faultID);
    this.getStaffFaults(this.faultID);
  }

  ngOnInit() {
  }

  ionViewWillEnter(){

  }

  getStaffFaults(faultID) {
    this.http.get(this.url + 'sp-get-fault-details-staff.php?id=' + faultID).subscribe((data: any) => {
      console.log(data);
      this.fault = data.fault;
      this.site = data.site;
      this.user = data.user;
    });
  }

}
