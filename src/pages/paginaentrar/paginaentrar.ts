import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController  } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { CarritoProvider } from '../../providers/carrito/carrito';


@Component({
  selector: 'page-paginaentrar',
  templateUrl: 'paginaentrar.html',
})
export class PaginaentrarPage {

  public gender:any = "";
  public arreglo:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private loginprovider:LoginProvider,
  private toasCtrl:ToastController,private loadCtrl:LoadingController,private carritoPrd:CarritoProvider) {
  }

  ionViewDidEnter() {
    let cargando = this.loadCtrl.create({content:"Espere, cargando sucursales"});
    cargando.present();
    this.carritoPrd.getCarritos().subscribe(datos => {
        this.arreglo = datos;
        cargando.dismiss();
    },error => {
      cargando.dismiss();
      let mensajeError = this.toasCtrl.create({message:"Error al cargar las sucursales,\nNota: Cerrar la aplicación",closeButtonText:"Cerrar",showCloseButton:true});
      mensajeError.present();
    });
  }

  public ingresar():any{
     this.loginprovider.setCarrito(this.gender);
      if(this.gender == ""){
          let toas = this.toasCtrl.create({message:"Se debe elegir la sucursal a entrar",closeButtonText:"Cerrar",showCloseButton:true});
          toas.present();
      }else{
        this.loginprovider.setEntrar(true);      
        
      }
  }

}
