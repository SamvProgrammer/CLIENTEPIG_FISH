import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { InventarioProvider } from '../../providers/inventario/inventario';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

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
  public arreglo:any = [];
  public inventarioElegido = [];
 
   constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,
               private inventarioPrd:InventarioProvider,private usuariosPrd:UsuariosProvider) {


                let sucursal = usuariosPrd.getSucursal();
         inventarioPrd.gets(sucursal).subscribe(datos =>{
               for(let i of datos){
                 
                   }                 
               
               
               this.arreglo = datos;
 
           });
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

