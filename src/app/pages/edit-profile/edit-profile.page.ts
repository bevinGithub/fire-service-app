import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: any = {};
  userID: any;
  roleID: any;
  validEmail: boolean;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
  ) {
    this.userID = this.activatedRoute.snapshot.paramMap.get('userID');
    this.http.get(this.url + 'sp-get-profile.php?userID=' + this.userID).subscribe((user: any) => {
      console.log(user);
      this.user = user;
    });
    this.storage.get('currentUser').then((user: any) => {
      this.roleID = user.role_id;
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
    this.http.post(this.url + 'sp-update-profile.php', this.user).subscribe((resp: any) => {
      console.log(resp);
      if(resp === 'success') {
        this.notificationMsg('User profile has been updated successfully!');
        if (this.user.role_id === '2') {
          this.router.navigate(['/staff-menu/staff-dashboard']);
        }
        if (this.user.role_id === '3') {
          this.router.navigate(['/staff-menu/user-profile']);
        }
        if (this.user.role_id === '4') {
          this.router.navigate(['/technician-menu/technician-dashboard']);
        }
      } else {
        this.notificationMsg('User process could not be updated successfully!');
      }
    });
  }

  async notificationMsg(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }
}
