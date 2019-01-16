import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ToastController,ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CombosProvider } from '../../providers/combos/combos';
import { ProductoscombosAddmodalproductoPage } from '../productoscombos-addmodalproducto/productoscombos-addmodalproducto';

/**
 * Generated class for the ProductoscombosAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-productoscombos-add',
  templateUrl: 'productoscombos-add.html',
})
export class ProductoscombosAddPage {

  myForm: FormGroup;
  public boton: string = "";
  private id;
  private variable;
  public productos:any = [];

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl:ToastController,
    private combosPrd:CombosProvider,
    private modalCtrl:ModalController
  ) {
    this.variable = this.parametros.get("parametro");

    this.boton = this.parametros.get("boton");
    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.id_combo;
      this.myForm = this.createMyForm(this.variable);
      this.combosPrd.getCombosDetalle(this.id).subscribe(datos => {
        this.productos = datos;
      });
    }
  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      descripcion: [obj.descripcion, Validators.required],
      precio:[obj.precio,Validators.required]
    });
  }
  saveData() {
    let obj = this.myForm.value;
    let nombre = obj.nombre;
    let descripcion = obj.descripcion;
    let precio = obj.precio;

    let detalle = [];
    for(let item of this.productos){
      let objetodetalle = {id_producto:item.id_producto,cantidad:item.cantidad};
      detalle.push(objetodetalle);
    }

    obj = {
      nombre: nombre,
      descripcion: descripcion,
      precio : precio,
      detalle:detalle
    }
    
    if (this.boton == "Actualizar") {
        obj.id_combo = this.variable.id_combo;      
        this.combosPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.combosPrd.insertar(obj).subscribe(datos => {

         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }


  public agregarproductos():any{
     let modal = this.modalCtrl.create(ProductoscombosAddmodalproductoPage,{productos:this.productos});
     modal.present();
     modal.onDidDismiss(datos => {
       if(datos.datos){
        this.productos = datos.datos;
       }
     });
  }

  
}
