import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tech-selected-modules',
  templateUrl: './tech-selected-modules.page.html',
  styleUrls: ['./tech-selected-modules.page.scss'],
})
export class TechSelectedModulesPage implements OnInit {
  url = environment.url;
  moduleID: any;
  module: any;
  moduleName: any;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private loadingController: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
    this.http.get(this.url + 'get-module-data.php?id=' + this.moduleID).subscribe((mod: any) => {
      console.log(mod);
      this.module = mod;
      this.moduleName = this.module?.module_name.toUpperCase();
    });
  }

  ngOnInit() {
  }

}
