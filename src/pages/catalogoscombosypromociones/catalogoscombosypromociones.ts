import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CombosProvider } from '../../providers/combos/combos';
import { SubcatalogosOrdenPage } from '../subcatalogos-orden/subcatalogos-orden';


/**
 * Generated class for the CatalogoscombosypromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-catalogoscombosypromociones',
  templateUrl: 'catalogoscombosypromociones.html',
})
export class CatalogoscombosypromocionesPage {
  public arreglo: any = [];
  public arregloDetalle: any = [];
  public nombre: any = "";
  public tipo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private combosPrd: CombosProvider,
    private modalCtrl: ModalController) {
    this.nombre = navParams.get("tipo");
    switch (this.nombre) {
      case "combos":
        combosPrd.getCombos().subscribe(datos => {
          this.arreglo = datos;
          
        
          for (let item of this.arreglo) {
            item.ruta_imagen = "data:image/png;base64," + item.imagen;
            this.combosPrd.getCombosDetalle(item.id_combo).subscribe(resp => {
              item.lista = resp;
              console.log(resp);
            });
          }
        });
        this.tipo = 2;
        break;
      case "promociones":
        this.tipo = 3;
        break;

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoscombosypromocionesPage');
  }

  public verproductos(obj): any {

  }

  public agregarOrden(obj): any {
    //tipo 1 es producto, tipo 2 es combo y tipo 3 es promoción..
    obj.id_producto = obj.id_combo;
    let modal = this.modalCtrl.create(SubcatalogosOrdenPage, { parametro: obj, tipo: this.tipo });
    modal.present();
  }

}
