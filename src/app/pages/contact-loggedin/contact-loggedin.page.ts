import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-contact-loggedin',
  templateUrl: './contact-loggedin.page.html',
  styleUrls: ['./contact-loggedin.page.scss'],
})
export class ContactLoggedinPage implements OnInit {
  contact: any = {};
  validEmail: boolean;
  url = environment.url;
  roleID: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private callNumber: CallNumber
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.contact.name = user.firstname;
      this.contact.surname = user.surname;
      this.contact.email = user.email;
      this.contact.mobile_number = user.mobile_number;
      this.contact.userID = user.id;
      this.contact.spID = user.role_id;
      this.roleID = user.role_id;
    });
   }

  ngOnInit() {
  }

  sendEnquiry() {
    this.storage.get('currentUser').then((user: any) => {
      this.http.post(this.url + 'process-contact-form-logged.php', this.contact).subscribe((data: any) => {
        console.log(data);
        if (data.status === 'success') {
          this.systemNotify('Your enquiry has been submitted successfully!');
          if (user.role_id === '2') {
            this.router.navigate(['/client-menu/client-dashboard']);
          }
          if (user.role_id === '3') {
            this.router.navigate(['/staff-menu/staff-dashboard']);
          }
          if (user.role_id === '4') {
            this.router.navigate(['/technician-menu/technician-dashboard']);
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

  callFireServices() {
    this.callNumber.callNumber('0622115954', true).then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  callCell() {
    this.callNumber.callNumber('0828213161', true).then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
