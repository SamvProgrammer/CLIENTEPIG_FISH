import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the PaginaentrarRolesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-paginaentrar-roles',
  templateUrl: 'paginaentrar-roles.html',
})
export class PaginaentrarRolesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaentrarRolesPage');
  }

  public  salir():any{
    this.viewCtrl.dismiss();
  }

}
