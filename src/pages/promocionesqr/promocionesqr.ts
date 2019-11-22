import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner'
/**
 * Generated class for the PromocionesqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-promocionesqr',
  templateUrl: 'promocionesqr.html',
})
export class PromocionesqrPage {
options: BarcodeScannerOptions;
encodText:string;
encodedData:any={};
scannedData:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams , public scanner:BarcodeScanner) {
  }

  scan(){
    console.log("llega aqui");
    this.options={
      prompt : 'Escanea el código de barras o Qr'
    };
    this.scanner.scan(this.options).then((data) =>{
      this.scannedData=data;
    }, (err) => {
      console.log('Error:', err);
    })
    }
    encode(){
      console.log(this.encodText);
      this.scanner.encode(this.scanner.Encode.TEXT_TYPE,this.encodText).then((data) =>{
        this.encodedData=data;
      },(err)=>{
        console.log('Error:',err);
      })
    }
  }


