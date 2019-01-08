import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the SubcatalogosOrdenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-subcatalogos-orden',
  templateUrl: 'subcatalogos-orden.html',
})
export class SubcatalogosOrdenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcatalogosOrdenPage');
  }

  public salir() {
    this.viewCtrl.dismiss();
  }

}
