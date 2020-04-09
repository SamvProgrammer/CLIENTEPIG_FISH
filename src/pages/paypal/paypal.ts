import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PayPal,PayPalPayment,PayPalConfiguration,PayPalPaymentDetails} from '@ionic-native/paypal';
/**
 * Generated class for the PaypalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private Paypal:PayPal ) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypalPage');
  }

  comprar()
  {
    console.log("entra");
    this.Paypal.init({
      PayPalEnvironmentProduction:'',
      PayPalEnvironmentSandbox:'AQJN-zne41hgPKpbguWvylUWjWCKPWItZu--Yd1K-p660vaHETCaSG6qkwUu_ZAABseOVxAyH0j01ct7'
    }).then(()=>{
       this.Paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
 acceptCreditCards:true,
 languageOrLocale:'es-MX',
 merchantName:'IONIC',
 merchantPrivacyPolicyURL:'',
 merchantUserAgreementURL:''
       })).then (()=>{
   let details= new PayPalPaymentDetails('20.00','0.00','0.00');
   let payment = new PayPalPayment('20.00','MXN','IONIC','Sale',details);
   this.Paypal.renderSinglePaymentUI(payment).then((response) =>{

   })
       })
    })
  }

}

