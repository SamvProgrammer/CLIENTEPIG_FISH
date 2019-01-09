import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoscombosPage } from '../productoscombos/productoscombos';
import { ProductospromocionesPage } from '../productospromociones/productospromociones';

/**
 * Generated class for the ProductoscombosypromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-productoscombosypromociones',
  templateUrl: 'productoscombosypromociones.html',
})
export class ProductoscombosypromocionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoscombosypromocionesPage');
  }


  public ingresarCombo():any{
      this.navCtrl.push(ProductoscombosPage);
  }

  public ingresarPromociones():any{

    this.navCtrl.push(ProductospromocionesPage);
  }
}
