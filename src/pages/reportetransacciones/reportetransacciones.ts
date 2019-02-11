import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReportetransaccionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reportetransacciones',
  templateUrl: 'reportetransacciones.html',
})
export class ReportetransaccionesPage {

  public arreglo:any = [];
  public fecha:any = "";
  public total:any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.arreglo = navParams.get("arreglo");
    this.fecha = navParams.get("fecha");
    console.log(this.fecha);
    for(let item of this.arreglo){
        this.total = this.total + item.total;
    }
  }

  ionViewDidLoad() {
    
  }

}
