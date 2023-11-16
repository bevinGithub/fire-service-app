import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {
  page: any;
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
  ) {
    this.http.get(this.apiUrl + 'pages/23769').subscribe((data: any) => {
      console.log(data);
      this.page = data;
    });
  }

  ngOnInit() {
    this.spinnerLoading();
  }

  ionViewWillEnter(){
    this.http.get(this.apiUrl + 'pages/23769').subscribe((data: any) => {
      console.log(data);
      this.page = data;
    });
  }

  async spinnerLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

}
