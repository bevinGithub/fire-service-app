import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-fault-report',
  templateUrl: './add-fault-report.page.html',
  styleUrls: ['./add-fault-report.page.scss'],
})
export class AddFaultReportPage implements OnInit {
  sites: any;
  site: any = {};
  staffID: any;
  url = environment.url;
  buttonActive: boolean;
  siteSelected: any;
  total: any;
  moduleID: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
      this.moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
      this.site.moduleID = this.moduleID;
      console.log('Module ID: ' + this.moduleID);
      this.buttonActive = false;
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((user: any) => {
          this.staffID = user.id;
          console.log(user);
          this.http.get(this.url + 'sp-sites-selection.php?staffID=' + this.staffID).subscribe((data: any) => {
            console.log(data);
            this.sites = data;
          });
          this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
            console.log(res);
            this.total = res?.total;
          });
        });
      });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
    this.site.moduleID = this.moduleID;
    console.log('Module ID: ' + this.moduleID);
  }

  nextStep() {
    console.log(this.site);
  }

  siteOneChange(ev){
    console.log(ev.detail.checked);
    console.log(ev.detail.value);
    if (ev.detail.checked === true) {
      this.site.site_one = ev.detail.value;
      this.site.check_two = false;
      this.site.check_three = false;
      this.site.check_four = false;
      this.site.checkfive = false;
      this.siteSelected = ev.detail.value;
      this.buttonActive = true;
    } else {
      ev.detail.checked = false;
      this.site.site_one = '';
    }
    if (ev.detail.checked === false) {
      ev.detail.checked = false;
      this.site.site_one = '';
      // this.siteSelected = '';
      // this.buttonActive = false;
    }
  }

  siteTwoChange(ev){
    console.log(ev.detail.checked);
    console.log(ev.detail.value);
    if (ev.detail.checked === true) {
      this.site.site_two = ev.detail.value;
      this.site.check_one = false;
      this.site.check_three = false;
      this.site.check_four = false;
      this.site.checkfive = false;
      this.siteSelected = ev.detail.value;
      this.buttonActive = true;
    } else {
      ev.detail.checked = false;
      this.site.site_two = '';
    }

    if (ev.detail.checked === false) {
      ev.detail.checked = false;
      this.site.site_two = '';
      // this.siteSelected = '';
      // this.buttonActive = false;
    }
  }

  siteThreeChange(ev){
    console.log(ev.detail.checked);
    console.log(ev.detail.value);
    if (ev.detail.checked === true) {
      this.site.site_three = ev.detail.value;
      this.site.check_one = false;
      this.site.check_two = false;
      this.site.check_four = false;
      this.site.checkfive = false;
      this.siteSelected = ev.detail.value;
      // this.buttonActive = true;
    }
    if (ev.detail.checked === false) {
      ev.detail.checked = false;
      this.site.site_three = '';
      // this.siteSelected = '';
      // this.buttonActive = false;
    }
  }

  siteFourChange(ev){
    console.log(ev.detail.checked);
    console.log(ev.detail.value);
    if (ev.detail.checked === true) {
      this.site.site_four = ev.detail.value;
      this.site.check_one = false;
      this.site.check_three = false;
      this.site.check_two = false;
      this.site.checkfive = false;
      this.siteSelected = ev.detail.value;
      this.buttonActive = true;
    }
    if (ev.detail.checked === false) {
      ev.detail.checked = false;
      this.site.site_four = '';
      // this.siteSelected = '';
      // this.buttonActive = false;
    }
  }

  siteFiveChange(ev){
    console.log(ev.detail.checked);
    console.log(ev.detail.value);
    if (ev.detail.checked === true) {
      this.site.site_five = ev.detail.value;
      this.site.check_one = false;
      this.site.check_three = false;
      this.site.check_four = false;
      this.site.checktwo = false;
      this.siteSelected = ev.detail.value;
      this.buttonActive = true;
    }
    if (ev.detail.checked === false) {
      ev.detail.checked = false;
      this.site.site_five = '';
      // this.siteSelected = '';
      // this.buttonActive = false;
    }
  }

}
