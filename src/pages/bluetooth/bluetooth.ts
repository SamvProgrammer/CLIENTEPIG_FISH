import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { BluetoothDispositivosPage } from '../bluetooth-dispositivos/bluetooth-dispositivos';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the BluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private toasCtrl:ToastController,
    private bt:BluetoothSerial) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad BluetoothPage');
    }
  
    public dispositivos(){
        this.navCtrl.push(BluetoothDispositivosPage);
    }
  
    public imprimir(){
  
        console.log("SE VA A IMPRIMIR----");
        let toas = this.toasCtrl.create({message:"Impresión prueba mandada a impresora",duration:1500});
        toas.present();
        this.bt.write("Impresión prueba\notra impresion \n").then(datos =>{
          console.log(JSON.stringify(datos));
        },err =>{
          console.log(JSON.stringify(err));
        });
    }
}
