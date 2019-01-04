import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,FabContainer,AlertController,ToastController} from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { SucursalesAddPage } from '../sucursales-add/sucursales-add';

/**
 * Generated class for the SucursalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sucursales',
  templateUrl: 'sucursales.html',
})
export class SucursalesPage {


  public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private carritoPrd:CarritoProvider,private alertaCtrl:AlertController,private toasCtrl:ToastController) {
    this.trerCarritos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SucursalesPage');
  }

 public trerCarritos():any{
            this.carritoPrd.getCarritos().subscribe(datos => {this.arreglo = datos;});
 }

  ionViewDidEnter(){
    this.trerCarritos();

  }
  public actualizando(refresher): any {
    this.carritoPrd.getCarritos().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public agregar(fab:FabContainer){
      fab.close();
      this.navCtrl.push(SucursalesAddPage,{boton:"Agregar"});
  }

  public actualizar(obj:any){
    this.navCtrl.push(SucursalesAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj){
     let id = obj.id;
     let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
      this.carritoPrd.eliminarUsuario(id).subscribe(resp => {
        this.carritoPrd.getCarritos().subscribe(res => {
          this.arreglo = res;
        });
        let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
        toas.present();
     });

     }},"Cancelar"]});
     

     alerta.present();

  }
}
