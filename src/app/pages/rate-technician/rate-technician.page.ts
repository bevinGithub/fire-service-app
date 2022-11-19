import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rate-technician',
  templateUrl: './rate-technician.page.html',
  styleUrls: ['./rate-technician.page.scss'],
})
export class RateTechnicianPage implements OnInit {
  jobID: any;
  job: any;
  tech: any;
  staff: any;
  staffID: any;
  technicianID: any;
  url = environment.url;
  rate: any = {};
  order: any;
  driver: any;
  star1: boolean;
  star2: boolean;
  star3: boolean;
  star4: boolean;
  star5: boolean;

  starW1: boolean;
  starW2: boolean;
  starW3: boolean;
  starW4: boolean;
  starW5: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    private activatedRouter: ActivatedRoute,
    private toastController: ToastController
  ) {
    this.star1 = false;
    this.star2 = false;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;

    this.starW1 = true;
    this.starW2 = true;
    this.starW3 = true;
    this.starW4 = true;
    this.starW5 = true;
    this.jobID = this.activatedRouter.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.http.get(this.url + 'get-job-data-rating.php?jobID=' + this.jobID).subscribe((data: any) => {
      console.log(data);
      this.tech = data?.tech;
      this.job = data?.job;
    });

    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.staffID = user.id;
    });
   }

  ngOnInit() {
  }

  rateOne(e) {
    console.log(e);
    this.star1 = true;
    this.starW1 = false;
    this.star2 = false;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;

    this.starW2 = true;
    this.starW3 = true;
    this.starW4 = true;
    this.starW5 = true;

    this.rate.jobID = e.jobID;
    this.rate.rating_value = e.rate_value;
    this.rate.staffID = e.staffID;
    this.rate.technicianID = e.technicianID;

  }

  rateTwo(e) {
    console.log(e);
    this.star1 = true;
    this.star2 = true;
    this.starW3 = true;
    this.starW4 = true;
    this.starW5 = true;

    this.starW1 = false;
    this.starW2 = false;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;

    this.rate.jobID = e.jobID;
    this.rate.rating_value = e.rate_value;
    this.rate.staffID = e.staffID;
    this.rate.technicianID = e.technicianID;
  }


  rateThree(e) {
    console.log(e);
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.starW4 = true;
    this.starW5 = true;

    this.starW1 = false;
    this.starW2 = false;
    this.starW3 = false;
    this.star4 = false;
    this.star5 = false;

    this.rate.jobID = e.jobID;
    this.rate.rating_value = e.rate_value;
    this.rate.staffID = e.staffID;
    this.rate.technicianID = e.technicianID;
  }

  rateFour(e) {
    console.log(e);
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = true;
    this.starW5 = true;

    this.starW1 = false;
    this.starW2 = false;
    this.starW3 = false;
    this.starW4 = false;
    this.star5 = false;

    this.rate.jobID = e.jobID;
    this.rate.rating_value = e.rate_value;
    this.rate.staffID = e.staffID;
    this.rate.technicianID = e.technicianID;
  }

  rateFive(e) {
    console.log(e);
    this.star1 = true;
    this.star2 = true;
    this.star3 = true;
    this.star4 = true;
    this.star5 = true;

    this.starW1 = false;
    this.starW2 = false;
    this.starW3 = false;
    this.starW4 = false;
    this.starW5 = false;

    this.rate.jobID = e.jobID;
    this.rate.rating_value = e.rate_value;
    this.rate.staffID = e.staffID;
    this.rate.technicianID = e.technicianID;
  }

  submitRating() {
    console.log(this.rate);
    this.technicianID = this.rate.technicianID;
    this.http.post(this.url + 'process-customer-rating.php', this.rate).subscribe((data: any) => {
      console.log(data);
      if (data.status === 'success') {
        this.confirmation('Rating has successfully been posted!');
        this.router.navigate(['/reviews/' + this.technicianID]);
      }
      if (data.status === 'error') {
        this.confirmation('Rating could not be posted at the moment!');
      }
    });
  }

  async confirmation(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
