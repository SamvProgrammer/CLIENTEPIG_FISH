import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { EnlaceProductodetalleinventarioPage } from '../enlace-productodetalleinventario/enlace-productodetalleinventario';
import { ProductosProvider } from '../../providers/productos/productos';

/**
 * Generated class for the EnlaceProductoinventarioAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-enlace-productoinventario-add',
  templateUrl: 'enlace-productoinventario-add.html',
})
export class EnlaceProductoinventarioAddPage {

  private  myForm: FormGroup;  
  private  inventario:any = [];
  private id:any = 0;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl:ToastController,
    private modalCtrl:ModalController,
    private productosPrd:ProductosProvider
  ) {
     let objeto = parametros.get("obj");
     this.id = objeto.id_producto;
     this.myForm = this.createMyForm(objeto);

     productosPrd.obtenerinsumos(this.id).subscribe(datos => {
            this.inventario = datos;
     });
    
  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      precio:[obj.precio,Validators.required]
    });
  }

  
  saveData() {
      
    let arregloObj = [];
    for(let item of this.inventario){
      let obj2 = {
        id_inventario:item.id_inventario,
        id_producto:item.id_producto,
        cantidad:item.cantidad
      }
      arregloObj.push(obj2);

      
    }
    let obj = {
      id_producto:this.id,
      insumos:arregloObj
    }
    this.productosPrd.insertarinsumos(obj).subscribe(datos => {
          
    let mensaje = this.toasCtrl.create({message:"Inventario insertado al producto",duration:1500});
    mensaje.present();
    this.navCtrl.pop();

    },error =>{
      let mensaje = this.toasCtrl.create({message:"Error al insertar",duration:1500});
    mensaje.present();
    });

  }


  public agregarinventario():any{
      let modal = this.modalCtrl.create(EnlaceProductodetalleinventarioPage,{inventario:this.inventario});
      modal.present();

      modal.onDidDismiss(respuesta => {
          
        respuesta = respuesta.datos;  
        for(let item of respuesta){
            item.id_producto = this.id;
          }
          this.inventario = respuesta; 
      });
  }

}
