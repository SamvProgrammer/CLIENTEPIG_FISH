import { Component } from '@angular/core';
import {  NavController, NavParams,FabContainer } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-subcatalogos',
  templateUrl: 'subcatalogos.html',
})
export class SubcatalogosPage {
  
public identificador:any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private login: LoginProvider) {
     this.identificador =  this.navParams.get("obj");
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    this.login.entrarSistema();
  }
    
}
