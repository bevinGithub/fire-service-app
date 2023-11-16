import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-module-certificates',
  templateUrl: './client-module-certificates.page.html',
  styleUrls: ['./client-module-certificates.page.scss'],
})
export class ClientModuleCertificatesPage implements OnInit {
  url = environment.url;
  moduleID: any;
  module: any;
  certs: any;
  moduleName: any;
  spId: any;
  moduleType: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: Storage
  ) {
    this.moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
    console.log('Module ID: ' + this.moduleID);
    this.http.get(this.url + 'get-module-data.php?id=' + this.moduleID).subscribe((mod: any) => {
      console.log(mod);
      this.module = mod;
      this.moduleName = this.module?.module_name.toUpperCase();
      const module = this.module?.module_name;
      this.getClientFaults(this.moduleID, module);
    });
    //this.getClientFaults(this.moduleID, this.moduleName);
  }

  ngOnInit() {
  }

  getClientFaults(modID, modName) {
    console.log(modName);
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.spId = user.sp_id;
      if (modName === 'Smoke Control') {
        this.moduleType = 'SC';
        // eslint-disable-next-line max-len
        this.http.get(this.url + 'sp-get-client-service-reports-sc-2.php?clientID='+ user?.id + '&spID=' + this.spId + '&moduleID=' + modID + '&mod=SC')
        .subscribe((data: any) => {
          console.log(data);
          this.certs = data;
        });
      }
      if (modName === 'Fire Detection') {
        this.moduleType = 'FD';
        // eslint-disable-next-line max-len
        this.http.get(this.url + 'sp-get-client-service-reports-2.php?clientID='+ user?.id + '&spID=' + this.spId + '&moduleID=' + modID + '&mod=FP')
        .subscribe((data: any) => {
          console.log(data);
          this.certs = data;
        });
      }
    });
  }

}
