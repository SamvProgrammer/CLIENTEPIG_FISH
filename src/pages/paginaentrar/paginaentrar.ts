import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController ,ModalController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { TabsPage } from '../tabs/tabs';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-paginaentrar',
  templateUrl: 'paginaentrar.html',
})
export class PaginaentrarPage {

  public gender:any = "";
  public arreglo:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private loginprovider:LoginProvider,
  private toasCtrl:ToastController,private loadCtrl:LoadingController,private carritoPrd:CarritoProvider,
    private modalCtrl:ModalController,private usuariosPrd:UsuariosProvider,private storage:Storage) {
  }

  ionViewDidEnter() {

    console.log("Entra aqui");
    this.storage.get('logeado').then((val) => {
      console.log("Se esta logenaod");
      if(val == true){
        console.log("Optiene el objeto");
        this.storage.get('obj').then((objeto) => {
          console.log("El objeto es tal");
          console.log(objeto);
          this.usuariosPrd.guardarUsuario(objeto,true);
          let iniciar = this.usuariosPrd.iniciar_en();
          //this.elegirIniciar(iniciar);
          this.navCtrl.setRoot(TabsPage);
        });
      }else{
        let cargando = this.loadCtrl.create({content:"Espere, cargando sucursales"});
        cargando.present();
        this.carritoPrd.getCarritos().subscribe(datos => {
            this.arreglo = datos;
            cargando.dismiss();
        },error => {
          cargando.dismiss();
          let mensajeError = this.toasCtrl.create({message:"Error al cargar las sucursales,\nNota: Cerrar la aplicación",closeButtonText:"Cerrar",showCloseButton:true});
          mensajeError.present();
        });
      }
  });


    
  }

  public ingresar():any{
      if(this.gender == ""){
          let toas = this.toasCtrl.create({message:"Se debe elegir la sucursal a entrar",closeButtonText:"Cerrar",showCloseButton:true});
          toas.present();
      }else{
       this.loginprovider.entrarSistema(this.gender).then(datos =>{
        

        this.usuariosPrd.ingresarSistema(datos).subscribe(datos =>{
          let ingresar = datos.entrar;
        if(ingresar == true){
          let toas = this.toasCtrl.create({message:"Sistema ingresado con exito",duration:1500});
          toas.present();
          this.usuariosPrd.guardarUsuario(datos,true);
          this.storage.set('obj',datos);
          this.storage.set('logeado',true);
          this.navCtrl.setRoot(TabsPage);
          //let iniciar = this.usuariosPdr.iniciar_en();
          //this.elegirIniciar(iniciar);
        }else{
          let toas = this.toasCtrl.create({message:"Usuario / Contraseña invalidos",duration:1500});
          toas.present();
        }
      });
      
       }).catch(err =>{
        let toas = this.toasCtrl.create({message:err,duration:1500});
        toas.present();
       });
      }
  }

}
