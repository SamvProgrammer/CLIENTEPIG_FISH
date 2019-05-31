import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,FabContainer,AlertController,ToastController} from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductosproductosAddPage } from '../productosproductos-add/productosproductos-add';


/**
 * Generated class for the ProductosproductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productosproductos',
  templateUrl: 'productosproductos.html',
})
export class ProductosproductosPage {


  public arreglo:any = [];
  public id_categoria;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private productosPrd:ProductosProvider,private alertaCtrl:AlertController,private toasCtrl:ToastController) {
    this.id_categoria = navParams.get("id_categoria");
    this.traerProductos();
  }

  ionViewDidLoad() {
    this.traerProductos();
  }

 public traerProductos():any{
            this.productosPrd.getProductosCategoria(this.id_categoria).subscribe(datos => {this.arreglo = datos;});
 }

  ionViewDidEnter(){
    this.traerProductos();

  }
  public actualizando(refresher): any {
    this.productosPrd.getProductosCategoria(this.id_categoria).subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public agregar(fab:FabContainer){
      fab.close();
      this.navCtrl.push(ProductosproductosAddPage,{boton:"Agregar",id_categoria:this.id_categoria});
  }

  public actualizar(obj:any){
    this.navCtrl.push(ProductosproductosAddPage,{boton:"Actualizar",id_categoria:this.id_categoria,parametro:obj});
  }

  public eliminar(obj){
     let id = obj.id_producto;
     let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
      this.productosPrd.eliminar(id).subscribe(resp => {
        this.productosPrd.getProductosCategoria(this.id_categoria).subscribe(res => {
          this.arreglo = res;
        });
        let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
        toas.present();
     });

     }},"Cancelar"]});
     

     alerta.present();

  }
}
