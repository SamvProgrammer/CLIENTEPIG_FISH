import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,LoadingController  } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';


@Component({
  selector: 'page-paginaentrar',
  templateUrl: 'paginaentrar.html',
})
export class PaginaentrarPage {

  public gender:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,private loginprovider:LoginProvider,
  private toasCtrl:ToastController,private loadCtrl:LoadingController) {
  }

  ionViewDidEnter() {
    let cargando = this.loadCtrl.create({content:"Espere, cargando sucursales",duration:2000});
    cargando.present();
  }

  public ingresar():any{
      if(this.gender == ""){
          let toas = this.toasCtrl.create({message:"Se debe elegir la sucursal a entrar",closeButtonText:"Entendido",showCloseButton:true});
          toas.present();
      }else{
        this.loginprovider.setEntrar(true);      

      }
  }

}
