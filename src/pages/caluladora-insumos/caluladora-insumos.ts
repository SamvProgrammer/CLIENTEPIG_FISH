import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgregaProductoPage } from '../agrega-producto/agrega-producto';
import { InventarioProvider } from '../../providers/inventario/inventario';

/**
 * Generated class for the CaluladoraInsumosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-caluladora-insumos',
  templateUrl: 'caluladora-insumos.html',
})
export class CaluladoraInsumosPage {

  private myForm: FormGroup;
  public inventario: any = [];
  public desglose:any=[];
  private id: any = 0;
  private id_sucursal;
  public boton: string = "";
  private variable;
  private id_inventario;
  private obj;
  private id_usuario;
  public nombre
  public id_producto;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl: ToastController,
    private inventarioPrd: InventarioProvider,
    private modalCtrl: ModalController) {
    this.myForm = this.createMyForm({});
  
  }


  private createMyForm(obj) {
    return this.formBuilder.group({
      cantidad: [obj.cantidad, Validators.required],
    });
  }

  saveData() {
    let obj = this.myForm.value;
    let cantidad = obj.cantidad;
    let id_producto=this.id_producto;


    obj = {
      cantidad: cantidad,
      id_producto:id_producto
    }

    console.log("prueba");
    
    this.inventarioPrd.desglose(cantidad,id_producto).subscribe(respuesta=>{
      this.desglose=respuesta;

      console.log(this.desglose);
    })
  }

  public agregarproducto(objeto: any): any {
    let modal = this.modalCtrl.create(AgregaProductoPage, { inventario: this.inventario });
    modal.present();

    modal.onDidDismiss(respuesta => {
      console.log("antezsa");
      console.log(respuesta);
      let elemento = respuesta.dato;

      this.id_producto = elemento.id_producto;
      this.nombre = elemento.nombre;

      this.inventario = respuesta;
    });


  }

}
