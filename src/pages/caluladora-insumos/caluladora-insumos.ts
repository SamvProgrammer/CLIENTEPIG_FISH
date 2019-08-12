import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AgregaProductoPage} from '../agrega-producto/agrega-producto';
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
  private inventario: any = [];
  private id: any = 0;
  private id_sucursal;
  public boton: string = "";
  private variable;
  private id_inventario;
  private obj;
  private id_usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl: ToastController,
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

    obj = {
      cantidad:cantidad
    }
  }

  public agregarproducto(): any {
    let modal = this.modalCtrl.create(AgregaProductoPage, { inventario: this.inventario });
    modal.present();
   
    modal.onDidDismiss(respuesta => {

      respuesta = respuesta.datos;
      for (let item of respuesta) {
        item.id_producto = this.id;
      }
      this.inventario = respuesta;
      for (let item1 of this.inventario) {
        this.id_inventario = item1.id_inventario
      }
      console.log(this.id_inventario)

    });

  
  }

}
