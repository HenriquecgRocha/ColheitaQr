import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the VisitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visita',
  templateUrl: 'visita.html',
  providers: [
    BarcodeScanner
  ]
})
export class VisitaPage {
  scannedCode = "";

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;alert(this.scannedCode)
     }).catch(err => {
         console.log('Error', err);
     });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitaPage');
  }

}
