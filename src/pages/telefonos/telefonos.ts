import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


/**
 * Generated class for the TelefonosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-telefonos',
  templateUrl: 'telefonos.html',
})
export class TelefonosPage {

  public arreglo: any = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, private ticketPrd: TicketsProvider, private alertCtr: AlertController, private contacts: Contacts,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.ticketPrd.getTelefonos().subscribe(datos => {
      this.arreglo = datos;
    });
  }

  public guardar(obj) {
    console.log(obj);
    let alerta = this.alertCtr.create({
      message: "¿Deseas guardar el número a tus contactos?", buttons: [{
        text: "si", handler: () => { 

          let contact: Contact = this.contacts.create() ;
          console.log("ESTOS SON LOS CONTAXTOS");
          console.log(contact);
          contact.name = new ContactName(null,'PigFish'+obj.id_folio);
          contact.phoneNumbers = [new ContactField('mobile', obj.telefono)];

          contact.save().then(
            () =>{
              let toast = this.toastCtrl.create({message: 'Contacto guardado!'+ contact,duration:1500});
              toast.present();
            },
            (error: any) => {
              let toast = this.toastCtrl.create({message: 'Ocurrio un error!'+ error,duration:1500});
              toast.present();
            }
          );
        }
      }]
    });

    alerta.present();
  }
}









