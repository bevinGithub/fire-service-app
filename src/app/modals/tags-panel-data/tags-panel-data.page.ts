import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tags-panel-data',
  templateUrl: './tags-panel-data.page.html',
  styleUrls: ['./tags-panel-data.page.scss'],
})
export class TagsPanelDataPage implements OnInit {
  siteID;
  panelNumber;
  panelCode;
  location;
  tagDate;
  serviceID;
  serviceTypeID;
  constructor(
    public  nfc: NFC,
    public  ndef: Ndef,
    private modalController: ModalController
  ) {

   }

  ngOnInit() {
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
