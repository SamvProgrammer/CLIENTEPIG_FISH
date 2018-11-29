import { Injectable } from '@angular/core';
import { AlertController,ToastController  } from 'ionic-angular';


@Injectable()
export class LoginProvider {

  private entrar:boolean = false;
  private activarMenu:boolean = false;
  private objUsuario:any;
  constructor(private alerta:AlertController,private toasCtrl:ToastController) {
    
  }


  //Establece si aparece la pantalla número uno....
  public getEntrar():boolean{
    return this.entrar;
  }
  public setEntrar(parametro:boolean):void{
     this.entrar = parametro;
  }

  public setActivaMenu(activa:boolean){
    this.activarMenu = activa;
  }
  public getActivaMenu():boolean{

    return this.activarMenu;
  }

  //Para logearse al sistema....
  public entrarSistema(){
    let alerta1 = this.alerta.create({
      title:'Usuario',
      subTitle:'Ingresar al sistema',
      inputs:[{
        name: 'usuario',
        placeholder: 'Ingresar usuario'
      },
      {
        name: 'password',
        placeholder: 'Ingresar contraseña',
        type:'password'
      }],
      buttons:[{
          text:"Ingresar",
          handler:datos=>{
            let respuesta = this.ingresarUsuarios(datos.usuario,datos.password);
            if(!respuesta){
              const toast = this.toasCtrl.create({
                message: 'Usuario y/o Contraseña invalida',
                duration: 3000
              });
              toast.present();
            }else{
               this.objUsuario = respuesta;
               this.activarMenu = true;
               const alert = this.alerta.create({
                title: 'Aviso',
                subTitle: 'Usuario ingresado al sistema sastifactoriamente.',
                buttons: ['OK']
              });
              alert.present();
            }
          }                  
      }]

   });
   alerta1.present();
  }



  //Se obtiene el rol del usuario validos solamente 1:Adminitrador, 2:Mesero y 3:Inventarios....
  public guardaUsuario():any{
    return this.objUsuario;
  }


  public ingresarUsuarios(usuario:any,contraseña:any):any{
    let usuarios = [{
      usuario:'administrador',
      rol:1,
      contraseña:'12345'
    },{
      usuario:'mesero',
      rol:2,
      contraseña:'12345'
    },{
      usuario:'inventario',
      rol:3,
      contraseña:'12345'
    }];

    let respuesta:any = null;
    usuarios.forEach(o => {
      
       if(o.usuario == usuario && o.contraseña == contraseña){
        respuesta = o;
       }
    });

    respuesta = respuesta !=  null? respuesta:false;

    return respuesta;
  }

}
