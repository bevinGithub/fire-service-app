import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-site-certificates',
  templateUrl: './view-site-certificates.page.html',
  styleUrls: ['./view-site-certificates.page.scss'],
})
export class ViewSiteCertificatesPage implements OnInit {
  siteID: any;
  sites: any;
  completed: any;
  open: any;
  url = environment.url;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.siteID = this.activatedRoute.snapshot.paramMap.get('siteID');
    console.log(this.siteID);
    this.http.get(this.url + 'get-site-certificates-history-new.php?siteID=' + this.siteID).subscribe((data: any) => {
      console.log(data);
      this.completed = data?.completed;
      this.open = data?.open;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.siteID = this.activatedRoute.snapshot.paramMap.get('siteID');
    console.log(this.siteID);
    this.http.get(this.url + 'get-site-certificates-history-new.php?siteID=' + this.siteID).subscribe((data: any) => {
      console.log(data);
      this.completed = data?.completed;
      this.open = data?.open;
    });
  }

}
