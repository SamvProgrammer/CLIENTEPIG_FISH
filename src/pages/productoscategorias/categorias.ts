import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,FabContainer,AlertController,ToastController} from 'ionic-angular';
import { ProductoscategoriasProvider } from '../../providers/productoscategorias/productoscategorias';
import { ProductoscategoriasAddPage } from '../productoscategorias-add/productoscategorias-add';


@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private carritoPrd:ProductoscategoriasProvider,private alertaCtrl:AlertController,private toasCtrl:ToastController) {
    this.trerCarritos();
  }

  ionViewDidLoad() {
    this.trerCarritos();
  }

 public trerCarritos():any{
            this.carritoPrd.getCategorias().subscribe(datos => {this.arreglo = datos;});
 }

  ionViewDidEnter(){
    this.trerCarritos();

  }
  public actualizando(refresher): any {
    this.carritoPrd.getCategorias().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public agregar(fab:FabContainer){
      fab.close();
      this.navCtrl.push(ProductoscategoriasAddPage,{boton:"Agregar"});
  }

  public actualizar(obj:any){
    this.navCtrl.push(ProductoscategoriasAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj){
     let id = obj.id;
     let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
      this.carritoPrd.eliminar(id).subscribe(resp => {
        this.carritoPrd.getCategorias().subscribe(res => {
          this.arreglo = res;
        });
        let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
        toas.present();
     });

     }},"Cancelar"]});
     

     alerta.present();

  }

}
