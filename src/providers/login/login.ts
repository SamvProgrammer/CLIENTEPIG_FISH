import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { UsuariosProvider } from '../usuarios/usuarios';
import { TabsPage } from '../../pages/tabs/tabs';


@Injectable()
export class LoginProvider {

  private entrar: boolean = false;
  private activarMenu: boolean = false;
  private objUsuario: any;
  private id_carrito:any;
  constructor(private alerta: AlertController, private toasCtrl: ToastController,
    private usuariosPrd: UsuariosProvider) {
      
  }


  

  //Para logearse al sistema....
  public entrarSistema(id_sucursal) {
   
    let promesa = new Promise((exito,error) =>{
      let alerta1 = this.alerta.create({
        title: 'Usuario',
        subTitle: 'Ingresar al sistema',
        inputs: [{
          name: 'usuario',
          placeholder: 'Ingresar usuario'
        },
        {
          name: 'password',
          placeholder: 'Ingresar contraseña',
          type: 'password'
        }],
        buttons: [{
          text: "Ingresar",
          handler: datos => {
            let obj = {
              login:datos.usuario,
              password:datos.password,
              idCarrito:id_sucursal
            }
            
            exito(obj);
          }
        }]
  
      });
      alerta1.present();
    })

    return promesa;
  }



  //Se obtiene el rol del usuario validos solamente 1:Adminitrador, 2:Mesero y 3:Inventarios....
 


  public ingresarUsuarios(usuario: any, contraseña: any): any {


    let respuesta: any = null;
    this.usuariosPrd.getUsuarioEspecifico(usuario).subscribe(datos => {
      if (datos.respuesta == undefined) {
        respuesta = datos;
        this.objUsuario = datos;
      }
    });

    respuesta = respuesta != null ? respuesta : false;

    return respuesta;
  }


}
