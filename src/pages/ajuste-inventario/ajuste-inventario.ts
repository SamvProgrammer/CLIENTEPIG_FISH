import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosProvider } from '../../providers/productos/productos';
import { AgregaMobimientoPage } from '../agrega-mobimiento/agrega-mobimiento';
import { InventarioProvider } from '../../providers/inventario/inventario';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

@Component({
  selector: 'page-ajuste-inventario',
  templateUrl: 'ajuste-inventario.html',
})
export class AjusteInventarioPage {

  private myForm: FormGroup;
  private inventario: any = [];
  private id: any = 0;
  private id_sucursal;
  public boton: string = "";
  private variable;
  private id_inventario;
  private obj;
  private id_usuario;



  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl: ToastController,
    private modalCtrl: ModalController,
    private productosPrd: ProductosProvider,
    private usuariosPrd: UsuariosProvider,
    private inventarioPrd: InventarioProvider,

  ) {
    this.variable = this.parametros.get("parametro");
    this.id_sucursal = usuariosPrd.getSucursal();
    console.log(this.id_sucursal);

    this.boton = this.parametros.get("boton");
    this.myForm = this.createMyForm({});
  }


  // NO BORRAR agregarinventario METODO QUE LLAMA CTALOGO ADICIONAL
  public agregarinventario(): any {
    let modal = this.modalCtrl.create(AgregaMobimientoPage, { inventario: this.inventario });
    modal.present();
    this.id_sucursal = this.usuariosPrd.getSucursal();
    this.id_usuario = this.usuariosPrd.getIdUsuario();

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
  private createMyForm(obj) {
    return this.formBuilder.group({
      cantidad: [obj.cantidad, Validators.required],
      ubicacion: [obj.ubicacion, Validators.required],
      tipo_mov: [obj.tipo_mov, Validators.required]
    });
  }

  saveData() {
    let obj = this.myForm.value;
    let ubicacion = obj.ubicacion;
    let cantidad = obj.cantidad;
    let tipo_mov = obj.tipo_mov;
    let id_inventario = this.id_inventario;
    let id_sucursal = obj.id_sucursal;
    let id_usuario = this.id_usuario;



    obj = {
      cantidad: cantidad,
      ubicacion: ubicacion,
      tipo_mov: tipo_mov,
      id_inventario: id_inventario,
      id_sucursal: this.id_sucursal,
      id_usuario: this.id_usuario

    }


      this.inventarioPrd.modificarajustes(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({ message: "Registro actualizado correctamente", duration: 1500 });
        toas.present();
        this.navCtrl.pop();
      });

  }
}
