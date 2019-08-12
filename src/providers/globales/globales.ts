import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, App, Platform } from 'ionic-angular';
import { PaginaentrarPage } from '../../pages/paginaentrar/paginaentrar';
import { Storage } from '@ionic/storage';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


/*
  Generated class for the GlobalesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalesProvider {

  private configuraciones;
  private objCualquiera;
  constructor(public http: HttpClient, private alertCtrl: AlertController, private appCtrl: App,
    private storage: Storage, private bt: BluetoothSerial, private platform: Platform) {

  }

  public cerrarAplicacion() {
    let alerta = this.alertCtrl.create({
      message: "¿Deseas salir de la aplicación?", subTitle: "Aviso",
      buttons: [{
        text: "Si", handler: () => {
          this.appCtrl.getRootNavs()[1].setRoot(PaginaentrarPage);
          this.storage.set("logeado", false);
        }
      }, "No"]
    });
    alerta.present();

  }

  public getConfiguraciones() {
    return this.configuraciones;
  }

  public setConfiguraciones(obj) {
    this.configuraciones = obj;
  }

  public valida(obj): boolean {

    let validado: boolean = false;
    if (obj != null || obj != undefined) {

      validado = true;
    }
    return validado;
  }


  public conectarCajero(mensaje) {


    var promesa = new Promise((resolver, errores) => {

      
      if(this.platform.is("cordova")){
        try {
          this.storage.get("cajero").then(configuracionimpresora => {

            if(configuracionimpresora != null){
              this.bt.isConnected().then(() => {
                this.bt.disconnect().then(conectado => {
                  let mac = configuracionimpresora.mac;
                  this.bt.connect(mac).subscribe(datosconectador => {
                    this.bt.write(mensaje).then(aceptaEscribir=>{
                      this.bt.disconnect().then(desconectabt => {
                        resolver("Se resuelve");
                      }).catch(errorDesconectar => {
                        errores("Error al desconectar despues de escribir");
                      });
                    }).catch(errorEscribir=>{
                      errores("No se pudo escribir");
                    });
                  }, error => {
                    errores("No se pudo conectar");
                  });
                }).catch(disconecteerror => {
                  errores("No se pudo desconectar");
                });
              }).catch(() => {
                let mac = configuracionimpresora.mac;
                this.bt.connect(mac).subscribe(datosconectador => {
                  this.bt.write(mensaje).then(aceptaEscribir=>{
                    this.bt.disconnect().then(desconectabt => {
                      resolver("Se resuelve");
                    }).catch(errorDesconectar => {
                      errores("Error al desconectar despues de escribir");
                    });
                  }).catch(errorEscribir=>{
                    errores("No se pudo escribir");
                  });
                }, error => {
                  errores("No se pudo desconectar");
                });
  
              });

            }else{
              errores("No hay impresora");
            }

          }).catch(error => {
            errores("Hay error no existe mac de impresora");
          });
        } catch{
          errores("Entro en el catch");
        }
      

      }else{

        errores("No es cordova");
      }

    });


    return promesa;
  }

  public conectarCocina(mensaje) {


    var promesa = new Promise((resolver, errores) => {

      
      if(this.platform.is("cordova")){
        try {
          this.storage.get("cocina").then(configuracionimpresora => {

            if(configuracionimpresora != null){
              this.bt.isConnected().then(() => {
                this.bt.disconnect().then(conectado => {
                  let mac = configuracionimpresora.mac;
                  this.bt.connect(mac).subscribe(datosconectador => {
                    this.bt.write(mensaje).then(aceptaEscribir=>{
                      this.bt.disconnect().then(desconectabt => {
                        resolver("Se resuelve");
                      }).catch(errorDesconectar => {
                        errores("Error al desconectar despues de escribir");
                      });
                    }).catch(errorEscribir=>{
                      errores("No se pudo escribir");
                    });
                  }, error => {
                    errores("No se pudo conectar");
                  });
                }).catch(disconecteerror => {
                  errores("No se pudo desconectar");
                });
              }).catch(() => {
                let mac = configuracionimpresora.mac;
                this.bt.connect(mac).subscribe(datosconectador => {
                  this.bt.write(mensaje).then(aceptaEscribir=>{
                    this.bt.disconnect().then(desconectabt => {
                      resolver("Se resuelve");
                    }).catch(errorDesconectar => {
                      errores("Error al desconectar despues de escribir");
                    });
                  }).catch(errorEscribir=>{
                    errores("No se pudo escribir");
                  });
                }, error => {
                  errores("No se pudo desconectar");
                });
  
              });

            }else{
              errores("No hay impresora");
            }

          }).catch(error => {
            errores("Hay error no existe mac de impresora");
          });
        } catch{
          errores("Entro en el catch");
        }
      

      }else{

        errores("No es cordova");
      }

    });


    return promesa;
  }

  public conectarBarra(mensaje) {

    var promesa = new Promise((resolver, errores) => {

      
      if(this.platform.is("cordova")){
        try {
          this.storage.get("barra").then(configuracionimpresora => {

            if(configuracionimpresora != null){
              this.bt.isConnected().then(() => {
                this.bt.disconnect().then(conectado => {
                  let mac = configuracionimpresora.mac;
                  this.bt.connect(mac).subscribe(datosconectador => {
                    this.bt.write(mensaje).then(aceptaEscribir=>{
                      this.bt.disconnect().then(desconectabt => {
                        resolver("Se resuelve");
                      }).catch(errorDesconectar => {
                        errores("Error al desconectar despues de escribir");
                      });
                    }).catch(errorEscribir=>{
                      errores("No se pudo escribir");
                    });
                  }, error => {
                    errores("No se pudo conectar");
                  });
                }).catch(disconecteerror => {
                  errores("No se pudo desconectar");
                });
              }).catch(() => {
                let mac = configuracionimpresora.mac;
                this.bt.connect(mac).subscribe(datosconectador => {
                  this.bt.write(mensaje).then(aceptaEscribir=>{
                    this.bt.disconnect().then(desconectabt => {
                      resolver("Se resuelve");
                    }).catch(errorDesconectar => {
                      errores("Error al desconectar despues de escribir");
                    });
                  }).catch(errorEscribir=>{
                    errores("No se pudo escribir");
                  });
                }, error => {
                  errores("No se pudo desconectar");
                });
  
              });

            }else{
              errores("No hay impresora");
            }

          }).catch(error => {
            errores("Hay error no existe mac de impresora");
          });
        } catch{
          errores("Entro en el catch");
        }
      

      }else{

        errores("No es cordova");
      }

    });


    return promesa;
  }


  public setObjeto(obj){
    this.objCualquiera = obj;
  }

  public getObjeto(){
    return this.objCualquiera;
  }
}
