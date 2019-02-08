import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,ViewController} from 'ionic-angular';
import { ApiyoutubeProvider } from '../../providers/apiyoutube/apiyoutube';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the ProductosproductoslistyoutubePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productosproductoslistyoutube',
  templateUrl: 'productosproductoslistyoutube.html',
})
export class ProductosproductoslistyoutubePage {


  private arreglo = [];
  public txtBarra;
  private delegado;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private youtube:ApiyoutubeProvider,private reproductoryoutube:YoutubeVideoPlayer,private plataforma:Platform,private view:ViewController) {
    
    youtube.obtenerVideos().subscribe(datos => {
          let videos = datos.items;
          for(let item of videos){
              if(item.id.kind == "youtube#video"){
                  this.arreglo.push(item);
              }
          }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosproductoslistyoutubePage');
  }


  public vervideo(identificador):any{
      if(this.plataforma.is('cordova')){
        this.reproductoryoutube.openVideo(identificador);
      }else{
        window.open('https://www.youtube.com/watch?v=' + identificador);
      }
  }

  public enviar(obj):any{
    this.view.dismiss({id:obj.id.videoId,nombre:obj.snippet.title})
  }

  public salir():any{
    this.view.dismiss();
  }
}
