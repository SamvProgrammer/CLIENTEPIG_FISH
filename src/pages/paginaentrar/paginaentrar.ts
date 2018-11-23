import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';


@Component({
  selector: 'page-paginaentrar',
  templateUrl: 'paginaentrar.html',
})
export class PaginaentrarPage {

  public gender:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,private loginprovider:LoginProvider) {
  }

  public ingresar():any{
      this.loginprovider.setEntrar(true);      
  }

}
