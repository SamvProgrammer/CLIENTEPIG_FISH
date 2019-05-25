import { Component } from '@angular/core';
import { CajaCortePage } from '../caja-corte/caja-corte';
import { CajaMesasPage } from '../caja-mesas/caja-mesas';

/**
 * Generated class for the CajaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-caja',
  templateUrl: 'caja.html',
})
export class CajaPage {
  tab1Root=CajaMesasPage;
  tab2Root=CajaCortePage;


  constructor() {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CajaPage');
  }



}
