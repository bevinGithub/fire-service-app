import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.page.html',
  styleUrls: ['./edit-staff.page.scss'],
})
export class EditStaffPage implements OnInit {
  staff: any = {};
  url = environment.url;
  validEmail: boolean;
  siteOne: boolean;
  siteTwo: boolean;
  siteThree: boolean;
  siteCount = 0;

  siteSelect: any;
  siteSelect2: any;
  siteSelect3: any;

  siteList: any;
  siteList2: any;
  siteList3: any;
  staffID: any;
  assignedSites: any;
  public clientID: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {
    // this.siteTwo = false;
    // this.siteThree = false;
    this.staffID = this.activatedRoute.snapshot.paramMap.get('staffID');
    console.log(this.staffID);
    this.http.get(this.url + 'sp-edit-client-staff.php?staffID=' + this.staffID).subscribe((staff: any) => {
      this.staff = staff[0];
      this.assignedSites = staff[1];
      // this.staff.site_one = staff[1].site_id;

      console.log(staff);
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('currentUser').then((user: any) => {
      this.clientID = user.id;
      this.staff.clientID = user.id;
      console.log(user);
      this.http.get(this.url + 'sp-get-client-sites.php?clientID=' + user.id).subscribe((sites: any) => {
        this.siteList = sites;
        this.siteList2 = sites;
        this.siteList3 = sites;
        // this.staff.site_one = staff[1].site_id;
        console.log(this.siteList);
        this.assignedSites = this.siteList;
      });
    });
  }

  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.staff.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  updateStaffMember() {
    console.log(this.staff);
    this.http.post(this.url + 'sp-client-update-staff.php', this.staff).subscribe((data: any) => {
      console.log(data);
      if (data.status === 'success') {
        this.systemConfirmation('Staff member successfuly updated!');
        this.router.navigate(['/client-menu/client-staff']);
      } else {
        this.systemConfirmation('Staff member could not be updated!');
      }
    });
  }

  async systemConfirmation(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

  displaySites() {
    this.siteCount++;
    console.log(this.siteCount);
    if (this.siteCount === 1) {
      this.siteOne = true;
  }
    if (this.siteCount === 2) {
        this.siteTwo = true;
    }
    if (this.siteCount === 3) {
      this.siteThree = true;
    }
  }

  siteSelectChange(event) {
    this.storage.get('currentUser').then((user: any) => {
      this.clientID = user.id;
      console.log(user);
      const siteExcludeID = event.target.value;
      console.log('Exclude 1: ' + siteExcludeID);
      this.http.get(this.url + 'get-client-sites-2.php?clientID=' + user.id + '&siteID=' + siteExcludeID).subscribe((sites: any) => {
        this.siteList2 = sites;
        console.log(this.siteList2);
      });
    });
  }

  siteSelectChange2(event) {
    this.storage.get('currentUser').then((user: any) => {
      this.clientID = user.id;
      console.log(user);
      const siteExcludeID3 = event.target.value;
      console.log('Exclude 3: ' + siteExcludeID3);
      const siteExcludeID2 = this.staff.site_one;
      console.log('Exclude' + siteExcludeID2);
      // eslint-disable-next-line max-len
      this.http.get(this.url + 'get-client-sites-3.php?clientID=' + user.id + '&siteID2=' + siteExcludeID2 + '&siteID3=' + siteExcludeID3).subscribe((sites: any) => {
        this.siteList3 = sites;
        console.log(this.siteList3);
      });
    });
  }

}
