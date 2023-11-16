import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-client-fault',
  templateUrl: './view-client-fault.page.html',
  styleUrls: ['./view-client-fault.page.scss'],
})
export class ViewClientFaultPage implements OnInit {
  fault: any;
  url = environment.url;
  faultID: any;
  reviews: any;
  user: any;
  site: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.faultID = this.activatedRoute.snapshot.paramMap.get('faultID');
    console.log(this.faultID);
    this.getClientFaults(this.faultID);
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.faultID = this.activatedRoute.snapshot.paramMap.get('faultID');
    this.getClientFaults(this.faultID);
  }

  getClientFaults(faultID) {
    this.http.get(this.url + 'sp-get-fault-details-client.php?id=' + faultID).subscribe((data: any) => {
      console.log(data);
      this.fault = data.fault;
      this.site = data.site;
      this.user = data.user;
    });
  }
}
