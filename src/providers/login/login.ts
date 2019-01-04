import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { UsuariosProvider } from '../usuarios/usuarios';


@Injectable()
export class LoginProvider {

  private entrar: boolean = false;
  private activarMenu: boolean = false;
  private objUsuario: any;
  constructor(private alerta: AlertController, private toasCtrl: ToastController,
    private usuariosPrd: UsuariosProvider) {

  }


  //Establece si aparece la pantalla número uno....
  public getEntrar(): boolean {
    return this.entrar;
  }
  public setEntrar(parametro: boolean): void {
    this.entrar = parametro;
  }

  public setActivaMenu(activa: boolean) {
    this.activarMenu = activa;
  }
  public getActivaMenu(): boolean {

    return this.activarMenu;
  }

  //Para logearse al sistema....
  public entrarSistema() {
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
          let respuesta: any = null;
          this.usuariosPrd.getUsuarioEspecifico(datos.usuario).subscribe(datos2 => {
            if (datos2.respuesta == undefined) {
              respuesta = datos2;
              this.objUsuario = datos2;
            }
            console.log(datos2);
            respuesta = respuesta != null ? respuesta : false;
            if (!respuesta) {
              const toast = this.toasCtrl.create({
                message: 'Usuario y/o Contraseña invalida',
                duration: 3000
              });
              toast.present();
            } else {
              this.objUsuario = respuesta;
        
              if (respuesta.login == datos.usuario && respuesta.password == datos.password) {

                this.activarMenu = true;
                const toast = this.toasCtrl.create({
                  message: 'Se ingreso al sistema con exito',
                  duration: 3000
                });
                toast.present();
              }else{

                const toast = this.toasCtrl.create({
                  message: 'Usuario y/o Contraseña invalida',
                  duration: 3000
                });
                toast.present();
              }

            }
          });

        }
      }]

    });
    alerta1.present();
  }



  //Se obtiene el rol del usuario validos solamente 1:Adminitrador, 2:Mesero y 3:Inventarios....
  public guardaUsuario(): any {
    return this.objUsuario;
  }


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
