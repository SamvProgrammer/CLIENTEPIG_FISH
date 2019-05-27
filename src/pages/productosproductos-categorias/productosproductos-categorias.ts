import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoscategoriasProvider } from '../../providers/productoscategorias/productoscategorias';
import { ProductosproductosPage } from '../productosproductos/productosproductos';

/**
 * Generated class for the ProductosproductosCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productosproductos-categorias',
  templateUrl: 'productosproductos-categorias.html',
})
export class ProductosproductosCategoriasPage {
public arreglo:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
   private productoPrd:ProductoscategoriasProvider) {
    this.productoPrd.getCategorias().subscribe(datos => {
      this.arreglo = datos;
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosproductosCategoriasPage');
  }

  public abripagina(id):any{
      this.navCtrl.push(ProductosproductosPage,{id_categoria:id});
  }

}
