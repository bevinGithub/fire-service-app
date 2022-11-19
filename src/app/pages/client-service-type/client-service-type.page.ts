import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-client-service-type',
  templateUrl: './client-service-type.page.html',
  styleUrls: ['./client-service-type.page.scss'],
})
export class ClientServiceTypePage implements OnInit {
  siteID: any;
  constructor(
    private storage: Storage,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.siteID = this.activateRoute.snapshot.paramMap.get('siteID');
    console.log(this.siteID);
   }

  ngOnInit() {
  }

}
