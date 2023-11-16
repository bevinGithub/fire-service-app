import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-curtains-checklist',
  templateUrl: './curtains-checklist.page.html',
  styleUrls: ['./curtains-checklist.page.scss'],
})
export class CurtainsChecklistPage implements OnInit {
  certID: any;
  panelID: any;
  curtainID: any;
  checklist: any;
  curtain: any;
  url = environment.url;
  role: any;
  // ventID/:panelID/:certID',
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  ) {
    const curtainID = this.activatedRoute.snapshot.paramMap.get('curtainID');
    const panelID = this.activatedRoute.snapshot.paramMap.get('panelID');
    const certID = this.activatedRoute.snapshot.paramMap.get('certID');
    console.log(curtainID,panelID,certID);
    this.getFanChecklist(curtainID, panelID, certID);
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

  getFanChecklist(cID, pID, certID) {
    this.http.get(this.url + 'get-curtain-checklist.php?curtainID=' + cID + '&panelID=' + pID + '&certID=' + certID)
    .subscribe((check: any) => {
      console.log(check);
      this.checklist = check?.checklist;
      this.curtain = check?.curtain;
    });
  }

}
