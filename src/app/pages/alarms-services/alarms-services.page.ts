import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alarms-services',
  templateUrl: './alarms-services.page.html',
  styleUrls: ['./alarms-services.page.scss'],
})
export class AlarmsServicesPage implements OnInit {
  staffID: any;
  clientID: any;
  services: any;
  total: any;
  spId: any;
  moduleID: any;
  module: any;
  moduleName: any;
  moduleType: any;
  certs: any;
  url = environment.url;
  openCerts: any;
  closedCerts: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
    console.log('Module ID: ' + this.moduleID);
    this.http.get(this.url + 'get-module-data.php?id=' + this.moduleID).subscribe((mod: any) => {
      console.log(mod);
      this.module = mod;
      this.moduleName = this.module?.module_name.toUpperCase();
      const module = this.module?.module_name;
      this.getStaffFaults(this.moduleID, module);
    });
  }

  getStaffFaults(modID, modName) {
    console.log(modName);
    this.storage.get('currentUser').then((user: any) => {
      this.spId = user.sp_id;
      if (modName === 'Smoke Control') {
        this.moduleType = 'SC';
        // eslint-disable-next-line max-len
        this.http.get(this.url + 'sp-get-staff-service-reports-sc-2.php?clientID=' + user?.client_id + '&moduleID=' + modID)
        .subscribe((data: any) => {
          console.log(data);
          this.certs = data;
          this.openCerts = this.certs?.openFaults;
          this.closedCerts = this.certs?.closedFaults;
        });
      }
      if (modName === 'Fire Detection') {
        this.moduleType = 'FD';
        // eslint-disable-next-line max-len
        this.http.get(this.url + 'sp-get-staff-service-reports-2.php?clientID=' + user?.client_id + '&moduleID=' + modID)
        .subscribe((data: any) => {
          console.log(data);
          this.certs = data;
          this.openCerts = this.certs?.openFaults;
          this.closedCerts = this.certs?.closedFaults;
        });
      }
    });
  }

  getHeaderCounter(clientID) {
    this.http.get(this.url + 'service-notifications.php?clientID=' + clientID).subscribe((res: any) => {
      console.log(res);
      this.total = res?.total;
    });
  }
}
