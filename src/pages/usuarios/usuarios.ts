import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,FabContainer,AlertController } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { UsuariosAddPage } from '../usuarios-add/usuarios-add';

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
  private toasCtrl:ToastController,private alertaCtrl : AlertController) {
    this.traerUsuarios();
  }

  public traerUsuarios(){
    this.usuariosprd.getUsuarios().subscribe(respuesta =>{
      this.arreglo = respuesta;
    },error => {
      let alerta = this.toasCtrl.create({message:error.message +"\n"+error.name,duration:3000});
      alerta.present();
      console.log(error.message +"\n"+error.name);
    });
  }

  ionViewDidEnter() {
    this.traerUsuarios();
}
  public actualizar(obj:any){
    this.navCtrl.push(UsuariosAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj){
     let id = obj.id;
     console.log("Este es el objeto a eliminar");
     console.log(obj);
     let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
      this.usuariosprd.eliminarUsuario(id).subscribe(resp => {
        this.usuariosprd.getUsuarios().subscribe(res => {
          this.arreglo = res;
        });
        let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
        toas.present();
     });

     }},"Cancelar"]});
     

     alerta.present();

  }
  
  public agregar(fab: FabContainer){
    fab.close();
    this.navCtrl.push(UsuariosAddPage,{boton:"Agregar"})
  }

  public actualizando(refresher): any {
    this.usuariosprd.getUsuarios().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

}
