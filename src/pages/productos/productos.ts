import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { CategoriasPage } from '../productoscategorias/categorias';
import { ProductosproductosCategoriasPage } from '../productosproductos-categorias/productosproductos-categorias';
import { ProductoscombosPage } from '../productoscombos/productoscombos';
import { ProductospromocionesPage } from '../productospromociones/productospromociones';


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
      case 'productos':
      this.navCtrl.push(ProductosproductosCategoriasPage);
      break;
      case 'combos':
      this.navCtrl.push(ProductoscombosPage);
      break;
      case 'categorias':
      this.navCtrl.push(CategoriasPage);
      break;
      case 'promociones':
      this.navCtrl.push(ProductospromocionesPage);
      break;
      default:
         let mensaje = this.toasCtrl.create({message:"Error en el menu",duration:1500});
         mensaje.present();
      break;
    }
  }
}
