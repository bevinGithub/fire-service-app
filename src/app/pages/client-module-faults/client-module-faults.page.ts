import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-module-faults',
  templateUrl: './client-module-faults.page.html',
  styleUrls: ['./client-module-faults.page.scss'],
})
export class ClientModuleFaultsPage implements OnInit {
  url = environment.url;
  moduleID: any;
  module: any;
  faults: any;
  moduleName: any;
  clientID: any;
  spId: any;
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
    });
    this.getClientFaults(this.moduleID);
  }

  ngOnInit() {
  }

  getClientFaults(modID) {
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((user: any) => {
        this.spId = user?.sp_id;
        this.clientID = user?.id;
        this.http.get(this.url + 'sp-get-client-fault-reports-2.php?clientID='+this.clientID + '&spID=' + this.spId + '&moduleID=' + modID)
        .subscribe((data: any) => {
          console.log(data);
          this.faults = data;
        });
      });
    });
  }

}
