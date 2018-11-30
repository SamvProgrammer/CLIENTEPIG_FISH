import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the UsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private usuariosprd:UsuariosProvider,
  private toasCtrl:ToastController) {
    this.usuariosprd.getUsuarios().subscribe(respuesta =>{
      this.arreglo = respuesta;
      console.log(this.arreglo);
    });
  }

  public actualizar(obj:any){
    console.log(obj);
  }

  public eliminar(obj){
     let id = obj.id_user;
     this.usuariosprd.eliminarUsuario(id).subscribe(resp => {
        console.log(resp.respuesta);
     });
  }
  

}
