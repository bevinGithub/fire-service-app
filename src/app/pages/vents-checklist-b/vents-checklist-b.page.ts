import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vents-checklist-b',
  templateUrl: './vents-checklist-b.page.html',
  styleUrls: ['./vents-checklist-b.page.scss'],
})
export class VentsChecklistBPage implements OnInit {
  certID: any;
  panelID: any;
  ventID: any;
  checklist: any;
  vent: any;
  url = environment.url;
  role: any;
  // ventID/:panelID/:certID',
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  ) {
    const ventID = this.activatedRoute.snapshot.paramMap.get('ventID');
    const panelID = this.activatedRoute.snapshot.paramMap.get('panelID');
    const certID = this.activatedRoute.snapshot.paramMap.get('certID');
    console.log(ventID,panelID,certID);
    this.getFusibleLinkChecklist(ventID, panelID, certID);
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.role = user?.role_id;
      console.log('Role ID: ' + this.role);
    });
  }

  getFusibleLinkChecklist(vID, pID, certID) {
    this.http.get(this.url + 'get-fusible-checklist.php?ventID=' + vID + '&panelID=' + pID + '&certID=' + certID)
    .subscribe((check: any) => {
      console.log(check);
      this.checklist = check?.checklistB;
      this.vent = check?.vent;
    });
  }

}
