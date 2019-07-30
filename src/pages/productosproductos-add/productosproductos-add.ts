import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoscategoriasProvider } from '../../providers/productoscategorias/productoscategorias';
import { ProductosproductoslistyoutubePage } from '../productosproductoslistyoutube/productosproductoslistyoutube';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-productosproductos-add',
  templateUrl: 'productosproductos-add.html',
})
export class ProductosproductosAddPage {

  myForm: FormGroup;
  public boton: string = "";
  private id;
  public categoria: any = [];
  private variable;
  public video: any = "";
  public id_video;
  public imagen = "";
  public texto = "Imagen no seleccionada";
  public nueva: boolean = false;
  public id_categoria;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private toasCtrl: ToastController,
    private productoscategoriasPrd: ProductosProvider,
    private catePrd: ProductoscategoriasProvider, private modal: ModalController,
    private camera: Camera
  ) {
    this.variable = this.parametros.get("parametro");
    console.log(JSON.stringify(this.variable))
    this.id_categoria = this.parametros.get("id_categoria");

    this.boton = this.parametros.get("boton");
    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.id;
      this.video = this.variable.nombre_video;
      this.imagen = this.variable.ruta_imagen;
      if(this.variable.ruta_imagen != null || this.variable.ruta_imagen != undefined){
        this.texto = (this.variable.ruta_imagen.length != 0) ? "Imagen seleccionada" : "Imagen no seleccionada";
      }else{
        this.texto = "Imagen no seleccionada";
        this.imagen = "";
      }
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
      categoria: [this.id_categoria, Validators.required],
      video: [obj.nombre_video],
      esmixta:[obj.esmixta,Validators.required]
    });
  }
  saveData() {
    let obj = this.myForm.value;
    let nombre = obj.nombre;
    let descripcion = obj.descripcion;
    let precio = obj.precio;
    let id_categoria = obj.categoria;
    let nombre_video = obj.video;
    let esmixta = obj.esmixta;

    obj = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      id_categoria: id_categoria,
      id_video: this.id_video,
      nombre_video: nombre_video,
      imagen:this.imagen,
      subirImagen:this.nueva,
      esmixta:esmixta
    }


    if (this.boton == "Actualizar") {
      obj.id_producto = this.variable.id_producto;
      this.productoscategoriasPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({ message: "Registro actualizado correctamente", duration: 1500 });
        toas.present();
      });
    } else {
      this.productoscategoriasPrd.insertar(obj).subscribe(datos => {

        let toas = this.toasCtrl.create({ message: "Registro insertado correctamente", duration: 1500 });
        toas.present();
      });
    }

    this.navCtrl.pop();
  }

  public agregarvideo(): any {
    let mo = this.modal.create(ProductosproductoslistyoutubePage);
    mo.present();
    mo.onDidDismiss(datos => {
      if (datos == undefined) return;
      this.video = datos.nombre;
      this.id_video = datos.id;
    });

  }


  public subirFoto() {
    console.log("subiendo una foto");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imagen =  imageData;
      this.nueva = true;
      this.texto = "Imagen seleccinada";

    }, (err) => {
      console.log("Error en obtener imagen" + JSON.stringify(err));
    });
  }

  public galeria() {
  
    console.log("subiendo una foto");
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imagen =  imageData;
      this.nueva = true;
      this.texto = "Imagen seleccinada";

    }, (err) => {
      console.log("Error en obtener imagen" + JSON.stringify(err));
    });
  }



}
