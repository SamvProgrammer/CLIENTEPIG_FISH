import { Component } from '@angular/core';
import { NavController, NavParams, FabContainer, ModalController, Platform } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { ProductosProvider } from '../../providers/productos/productos';
import { SubcatalogosOrdenPage } from './../subcatalogos-orden/subcatalogos-orden';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { CombosProvider } from '../../providers/combos/combos';

@Component({
  selector: 'page-subcatalogos',
  templateUrl: 'subcatalogos.html',
})
export class SubcatalogosPage {

  public identificador: any = 0;
  public arreglo: any = [];
  public tipo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private login: LoginProvider,
    private productosPrd: ProductosProvider, private modalCtrl: ModalController, private reproductoryoutube: YoutubeVideoPlayer, private plataforma: Platform,
  private combosPrd:CombosProvider) {
    this.identificador = this.navParams.get("obj");
      this.productosPrd.getProductosCategoria(this.identificador).subscribe(datos => {
        for (let item of datos)
        item.ruta_imagen = "data:image/png;base64," + item.ruta_imagen;
        
        this.arreglo = datos;
        console.log(datos);
      });
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    
  }

  public agregarOrden(obj): any {
    let modal = this.modalCtrl.create(SubcatalogosOrdenPage, { parametro: obj,tipo:1 });
    modal.present();
  }

  public vervideo(id) {
    if (this.plataforma.is('cordova')) {
      this.reproductoryoutube.openVideo(id);
    } else {
      window.open('https://www.youtube.com/watch?v=' + id);
    }
  }
}
