import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { EnlaceProductoinventarioPage } from '../enlace-productoinventario/enlace-productoinventario';
import { BluetoothPage } from '../bluetooth/bluetooth';
import { Storage } from '@ionic/storage';
import { GlobalesProvider } from '../../providers/globales/globales';
import {PaypalPage} from '../../pages/paypal/paypal';
/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  public cancelacion = false;
  public autorizacion = false;
  public enviarCocina:boolean = false;
  public enviarBarra:boolean = false;
  public impresoraCocina:boolean = false;
  public inventarios:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private globales: GlobalesProvider, private alertCtrl: AlertController,
  private toasCtrl:ToastController) {
  }

  ionViewDidLoad() {
    let configuraciones = this.globales.getConfiguraciones();
    
    if (configuraciones != null && configuraciones != undefined) {
      this.cancelacion = configuraciones.cancelacion;
      this.autorizacion = configuraciones.autorizacion;
      this.enviarCocina = configuraciones.enviarCocina;
      this.enviarBarra = configuraciones.enviarBarra;
      this.impresoraCocina = configuraciones.impresoraCocina;
      this.inventarios = configuraciones.inventarios;
    }
  }


  public abrirpagina(): any {

    this.navCtrl.push(EnlaceProductoinventarioPage);
  }

  public abrirpaginabluetooth() {
    this.navCtrl.push(BluetoothPage);
  }


  public abrirpaginaPaypal ()
  {
    this.navCtrl.push(PaypalPage);
  }

  public guardarCambios() {
    let alerta = this.alertCtrl.create({
      subTitle: "¿Deseas guardar cambios?",
      message: "Guardando configuraciones de la aplicación",
      buttons: [{
        text: "Si", handler: () => {
          let obj = {
            cancelacion:this.cancelacion,
            autorizacion:this.autorizacion,
            enviarCocina:this.enviarCocina,
            enviarBarra:this.enviarBarra,
            impresoraCocina:this.impresoraCocina,
            inventarios:this.inventarios
          }

          console.log(obj);

          this.storage.set("configuraciones", obj);
          this.globales.setConfiguraciones(obj);
          let toast=this.toasCtrl.create({message:"Configuraciones de la aplicación guardadas con exito",duration:1500});
          toast.present();
        }
      }, "No"]
    });
    alerta.present();
  }


  public salir(){
    this.globales.cerrarAplicacion();
  }

}
