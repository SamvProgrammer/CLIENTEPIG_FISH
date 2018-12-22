import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

/**
 * Generated class for the ProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private toasCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosPage');
  }


  public abrirVentana(tipo){

    switch(tipo){
      case 'producto':
      console.log("productos");
      break;
      case 'combos':
      console.log("combos");
      break;
      case 'categorias':
      console.log("categorias");
      break;
      default:
         let mensaje = this.toasCtrl.create({message:"Error en el menu",duration:1500});
         mensaje.present();
      break;
    }
  }
}
