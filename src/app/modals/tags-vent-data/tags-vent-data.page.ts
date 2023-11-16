import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tags-vent-data',
  templateUrl: './tags-vent-data.page.html',
  styleUrls: ['./tags-vent-data.page.scss'],
})
export class TagsVentDataPage implements OnInit {
  siteID;
  ventNumber;
  ventCode;
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
