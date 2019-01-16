import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';

/**
 * Generated class for the ProductoscombosAddmodalproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productoscombos-addmodalproducto',
  templateUrl: 'productoscombos-addmodalproducto.html',
})
export class ProductoscombosAddmodalproductoPage {

 public arreglo:any = [];
 public productosElegidos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,
              private productosPrd:ProductosProvider) {
      this.productosElegidos = navParams.get("productos");
      console.log(this.productosElegidos);
      let encontrado = false;
          productosPrd.getProductos().subscribe(datos =>{
              for(let i of datos){
                  for(let x of this.productosElegidos){
                     if(x.id_producto == i.id_producto){
                         i.cantidad = x.cantidad;
                         i.elegido = true;
                         encontrado = true;
                         break;
                     }
                  }                 
                 if(!encontrado){
                  i.cantidad = 1;
                  i.elegido = false;
                  encontrado = false;

                 }
                 encontrado = false;
              }
              this.arreglo = datos;

          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoscombosAddmodalproductoPage');
  }

  public salir():any{
    this.viewCtrl.dismiss({datos:null});
  }

  public getcantidad(indice): any {
    return this.arreglo[indice].cantidad;
  }

  public restar(indice): any {
    let cantidad = this.arreglo[indice].cantidad;
    if (cantidad == 1)
      cantidad = 1;
    else
      cantidad = cantidad - 1;

    this.arreglo[indice].cantidad = cantidad;
  }

  public sumar(indice): any {
    let cantidad = this.arreglo[indice].cantidad;
    cantidad = cantidad + 1;
    this.arreglo[indice].cantidad = cantidad;

  }


  public hecho():any{
      let enviar = [];
      for(let item of this.arreglo){
        if(item.elegido){
            enviar.push(item);
        }
      }
      this.viewCtrl.dismiss({datos:enviar});
  }
}
