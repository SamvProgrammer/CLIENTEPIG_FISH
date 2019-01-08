import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoscategoriasProvider } from '../../providers/productoscategorias/productoscategorias';


@Component({
  selector: 'page-productosproductos-add',
  templateUrl: 'productosproductos-add.html',
})
export class ProductosproductosAddPage {

  myForm: FormGroup;
  public boton: string = "";
  private id;
  public categoria:any = [];
  private variable;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl:ToastController,
    private productoscategoriasPrd:ProductosProvider,
    private catePrd:ProductoscategoriasProvider
  ) {
    this.variable = this.parametros.get("parametro");

    this.boton = this.parametros.get("boton");
    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.id;
      this.myForm = this.createMyForm(this.variable);
    }

    this.catePrd.getCategorias().subscribe(datos => {
      this.categoria = datos;
    });
  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      nombre: [obj.nombre, Validators.required],
      descripcion: [obj.descripcion, Validators.required],
      precio: [obj.precio, Validators.required],
      categoria:[obj.id_categoria,Validators.required]
    });
  }
  saveData() {
    let obj = this.myForm.value;
    let nombre = obj.nombre;
    let descripcion = obj.descripcion;
    let precio = obj.precio;
    let id_categoria = obj.categoria;

    obj = {
      nombre: nombre,
      descripcion: descripcion,
      precio:precio,
      id_categoria:id_categoria
    }
    
    if (this.boton == "Actualizar") {
      obj.id_producto = this.variable.id_producto;     
      console.log(obj); 
        this.productoscategoriasPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.productoscategoriasPrd.insertar(obj).subscribe(datos => {

         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }

}
