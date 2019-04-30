import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ToastController,ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoscategoriasProvider } from '../../providers/productoscategorias/productoscategorias';
import { ProductosproductoslistyoutubePage } from '../productosproductoslistyoutube/productosproductoslistyoutube';


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
  public video:any = "";
  public id_video;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl:ToastController,
    private productoscategoriasPrd:ProductosProvider,
    private catePrd:ProductoscategoriasProvider,private modal:ModalController
  ) {
    this.variable = this.parametros.get("parametro");

    this.boton = this.parametros.get("boton");
    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.id;
      this.video =this.variable.nombre_video;
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
      categoria:[obj.id_categoria,Validators.required],
      video:[obj.nombre_video]
    });
  }
  saveData() {
    let obj = this.myForm.value;
    let nombre = obj.nombre;
    let descripcion = obj.descripcion;
    let precio = obj.precio;
    let id_categoria = obj.categoria;
    let nombre_video = obj.video;
    
    obj = {
      nombre: nombre,
      descripcion: descripcion,
      precio:precio,
      id_categoria:id_categoria,
      id_video:this.id_video,
      nombre_video:nombre_video
    }
   
    
    if (this.boton == "Actualizar") {
      obj.id_producto = this.variable.id_producto;     
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

  public agregarvideo():any{
    let mo = this.modal.create(ProductosproductoslistyoutubePage);
    mo.present();
    mo.onDidDismiss(datos => {
      if(datos == undefined) return;
      this.video = datos.nombre;
      this.id_video = datos.id;
    });    

  }




}
