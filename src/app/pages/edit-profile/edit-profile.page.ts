import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: any = {};
  userID: any;
  validEmail: boolean;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
  ) {
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID');
    this.http.get(this.url + 'get-profile.php?userID=' + this.userID).subscribe((user: any) => {
      console.log(user);
      this.user = user;
    });
   }

  ngOnInit() {
  }

  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  updateUserProfile() {
    console.log(this.user);
    this.http.post(this.url + 'update-profile.php', this.user).subscribe((resp: any) => {
      console.log(resp);
      if(resp === 'success') {
        this.notificationMsg('User profile has been updated successfully!');
        this.router.navigate(['/staff-menu/user-profile']);
      } else {
        this.notificationMsg('User process could not be updated successfully!');
      }
    });
  }

  async notificationMsg(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
