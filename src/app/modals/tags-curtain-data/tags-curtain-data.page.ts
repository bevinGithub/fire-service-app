import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tags-curtain-data',
  templateUrl: './tags-curtain-data.page.html',
  styleUrls: ['./tags-curtain-data.page.scss'],
})
export class TagsCurtainDataPage implements OnInit {
  siteID;
  curtainNumber;
  curtainCode;
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
