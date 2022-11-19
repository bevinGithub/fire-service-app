import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.page.html',
  styleUrls: ['./pad.page.scss'],
})
export class PadPage implements OnInit, AfterViewInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  public signaturePadOptions = {
    minWidth: 2,
    canvasWidth: 360,
    canvasHeight: 300
  };
  public signatureImage: string;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.signaturePad.clear();
    // this.canvasResize();
  }

   drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    console.log(this.signatureImage);
  }

  drawClear() {
    this.signaturePad.clear();
  }

  canvasResize() {
    const canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }
}
