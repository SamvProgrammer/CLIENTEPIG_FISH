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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private carritoPrd:ProductosProvider,private alertaCtrl:AlertController,private toasCtrl:ToastController) {
    this.trerCarritos();
  }

  ionViewDidLoad() {
    this.trerCarritos();
  }

 public trerCarritos():any{
            this.carritoPrd.getProductos().subscribe(datos => {this.arreglo = datos;});
 }

  ionViewDidEnter(){
    this.trerCarritos();

  }
  public actualizando(refresher): any {
    this.carritoPrd.getProductos().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public agregar(fab:FabContainer){
      fab.close();
      this.navCtrl.push(ProductosproductosAddPage,{boton:"Agregar"});
  }

  public actualizar(obj:any){
    this.navCtrl.push(ProductosproductosAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj){
     let id = obj.id_producto;
     let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
      this.carritoPrd.eliminar(id).subscribe(resp => {
        this.carritoPrd.getProductos().subscribe(res => {
          this.arreglo = res;
        });
        let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
        toas.present();
     });

     }},"Cancelar"]});
     

     alerta.present();

  }
}
