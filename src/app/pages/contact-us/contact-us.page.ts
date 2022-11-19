import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  contact: any = {};
  validEmail: boolean;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private callNumber: CallNumber
  ) {

   }

  ngOnInit() {
  }

  sendEnquiry() {
    this.http.post(this.url + 'process-contact-form.php', this.contact).subscribe((data: any) => {
      console.log(data);
      if (data.status === 'success') {
        this.systemNotify('Your enquiry has been submitted successfully!');
        this.router.navigate(['/email-confirmation']);
      } else {
        this.systemNotify('Your enquiry could not be submitted successfully!');
      }
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
    this.callNumber.callNumber('0828213161 ', true).then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
