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
            let respuesta: any = null;
            this.usuariosPrd.ingresarSistema(obj).subscribe(datos =>{
              let ingresar = datos.entrar;
              if(ingresar == true){
               // let toas = this.toasCtrl.create({message:"Sistema ingresado con exito",duration:1500});
                //toas.present();
//                this.usuariosPrd.guardarUsuario(datos);
                exito(datos);
              }else{
                //let toas = this.toasCtrl.create({message:"Usuario / Contraseña invalidos",duration:1500});
                //toas.present();
                error("Usuario / Contraseña invalidos");
              }
          });
  
          }
        }]
  
      });
      alerta1.present();
    })

    return promesa;
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

  public setCarrito(id):any{
    this.id_carrito = id;
  }

  public getCarrito():any{
    return this.id_carrito;
  }

}
