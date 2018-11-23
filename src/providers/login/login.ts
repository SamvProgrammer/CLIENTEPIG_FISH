import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  private entrar:boolean = false;
  constructor(private alerta:AlertController) {
    
  }

  public getEntrar():boolean{
    return this.entrar;
  }
  public setEntrar(parametro:boolean):void{
     this.entrar = parametro;
  }

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
            console.log(datos);
          }                  
      }]

   });
   alerta1.present();
  }

}
