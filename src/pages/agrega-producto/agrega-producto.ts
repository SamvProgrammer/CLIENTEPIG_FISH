import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Select } from 'ionic-angular';
import { InventarioProvider } from '../../providers/inventario/inventario';
import { ProductosProvider } from '../../providers/productos/productos';



/**
 * Generated class for the AgregaProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agrega-producto',
  templateUrl: 'agrega-producto.html',
})
export class AgregaProductoPage {
  public arreglo = [];
  public inventarioElegido = [];
  public letras: string = "";
  public descripcion;
  public verdadero: any = [];
  public itemSeleccionado;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private inventarioPrd: InventarioProvider, private productosPrd: ProductosProvider) {

    this.productosPrd.getNombre().subscribe(datos => {
      this.arreglo = datos;
      this.verdadero = datos;
      console.log(datos);
    });

  }


  public hecho(): any {
   
    this.viewCtrl.dismiss({ dato: this.itemSeleccionado });
  }

  getItems(obj) {
    this.arreglo = this.verdadero.filter(obj => obj.nombre.includes(this.letras));
  }

  public salir() {
    this.viewCtrl.dismiss();
  }


  public actualizar(i){
    
    for(let item of this.arreglo){
      item.clase = "";
  }
    
    i.clase = "seleccionado";
    this.itemSeleccionado = i;
  }


  portChange(event: {
    component: Select,
    value: any 
  }) {
    console.log('valor:', event.value);
  }
}





