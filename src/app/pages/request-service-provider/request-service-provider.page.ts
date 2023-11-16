import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-service-provider',
  templateUrl: './request-service-provider.page.html',
  styleUrls: ['./request-service-provider.page.scss'],
})
export class RequestServiceProviderPage implements OnInit {
  contact: any = {};
  validEmail: boolean;
  url = environment.url;
  roleID: any;
  sps: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.http.get(this.url + 'get-sp-list.php?userID=' + user?.id).subscribe((sps: any) => {
        console.log(sps);
        this.sps = sps?.spsList;
      });
      this.contact.name = user.firstname;
      this.contact.surname = user.surname;
      this.contact.email = user.email;
      this.contact.mobile_number = user.mobile_number;
      this.contact.userID = user.id;
      this.roleID = user.role_id;
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.contact.subject = 'Service provider change request';
  }

  sendEnquiry() {
    console.log(this.contact);
    this.storage.get('currentUser').then((user: any) => {
      this.http.post(this.url + 'process-sp-change-form.php', this.contact).subscribe((data: any) => {
        console.log(data);
        if (data.status === 'success') {
          this.systemNotify('Your change request has been submitted successfully!');
          if (user.role_id === '2') {
            this.router.navigate(['/client-menu/client-dashboard']);
          }
        } else {
          this.systemNotify('Your enquiry could not be submitted successfully!');
        }
      });
    });
  }


  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.contact.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  async systemNotify(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

}
