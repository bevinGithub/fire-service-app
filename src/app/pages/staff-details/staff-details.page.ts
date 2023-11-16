import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.page.html',
  styleUrls: ['./staff-details.page.scss'],
})
export class StaffDetailsPage implements OnInit {
  staff: any;
  sites: any;
  staffID: any;
  siteData: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {
    this.staffID = this.activatedRoute.snapshot.paramMap.get('staffID');
    console.log(this.staffID);
    this.getStaffInfo(this.staffID);
  }

  ngOnInit() {
  }

  editStaff(staff) {
    console.log(staff);
    this.router.navigate(['/edit-staff/' + staff.id]);
  }

  removeStaff(staff) {
    console.log(staff);
    this.http.get(this.url + 'sp-remove-staff.php?staffID=' + staff.id).subscribe((data: any) => {
      console.log(data);
      if (data === 'success') {
        this.siteNotification('Staff member has been successfuly removed!');
        this.router.navigate(['/client-menu/client-staff']);
      } else {
        this.siteNotification('Staff member could not be removed!');
      }
    });
  }

  async siteNotification(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.staffID = this.activatedRoute.snapshot.paramMap.get('staffID');
    console.log(this.staffID);
    this.getStaffInfo(this.staffID);
  }

  getStaffInfo(staffID) {
    this.http.get(this.url + 'sp-get-staff.php?staffID=' + staffID).subscribe((data: any) => {
      console.log(data);
      this.staff = data[0];
      this.sites = data[1];
      this.siteData = this.sites[0];
      console.log(this.staff);
    });
  }

}
