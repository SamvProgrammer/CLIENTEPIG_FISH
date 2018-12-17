import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Slides, ToastController, AlertController, ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-detallecuentas',
  templateUrl: 'detallecuentas.html',
})
export class DetallecuentasPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  public valor = 1;
  public arreglo = [{ nombre: "chapata", precio: 50, cantidad: 1 }, { nombre: "Torta", precio: 60, cantidad: 1 }, { nombre: "Arrachera", precio: 80, cantidad: 1 }, { nombre: "Agua", precio: 70, cantidad: 1 }];
  public order = [{ nombre: "chapata", precio: 50, cantidad: 2 }, { nombre: "Torta", precio: 60, cantidad: 4 }, { nombre: "Arrachera", precio: 80, cantidad: 1 }, { nombre: "Agua", precio: 70, cantidad: 3 }];
  public orden: any;
  public folio: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, private toastCtrl: ToastController, private alertaCtrl: AlertController, private actionSheetCtrl: ActionSheetController) {

    this.orden = navParams.get("orden");
    this.folio = navParams.get("folio");
  }

  // Initialize slider
  ionViewDidEnter() {
    this.slideChanged();
  }

  // On segment click
  selectedTab(index) {
    this.slider.slideTo(index);
    console.log("selectedTab", index)
  }


  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    let slides_count = this.segments.nativeElement.childElementCount;

    this.page = currentIndex.toString();
    if (this.page >= slides_count)
      this.page = (slides_count - 1).toString();

    console.log("slides_count", slides_count)
    console.log("this.page", this.page)
    this.centerScroll();
  }

  // Center current scroll
  centerScroll() {
    if (!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2);

    result = (result > 0) ? result : 0;
    this.smoothScrollTo(result);
  }

  // Get size start to current
  sizeLeft() {
    let size = 0;
    for (let i = 0; i < this.page; i++) {
      size += this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX) {
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 400;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }

  public salir() {
    this.viewCtrl.dismiss();
  }

  public getcantidad(indice): any {
    return this.arreglo[indice].cantidad;
  }

  public restar(indice): any {
    let cantidad = this.arreglo[indice].cantidad;
    if (cantidad == 1)
      cantidad = 1;
    else
      cantidad = cantidad - 1;

    this.arreglo[indice].cantidad = cantidad;
  }

  public sumar(indice): any {
    let cantidad = this.arreglo[indice].cantidad;
    cantidad = cantidad + 1;
    this.arreglo[indice].cantidad = cantidad;

  }

  public agregarCarrito(indice) {
    let obj = this.arreglo[indice];
    const mensaje = this.toastCtrl.create({
      message: "Producto agregado al carrito",
      duration: 1000
    });
    mensaje.present();
    this.arreglo[indice].cantidad = 1;
  }

  public verCuenta() {
    //this.navCtrl.push(DetalleCuentaPage);
  }

  public modificaCuenta(obj) {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar acción',
      cssClass: 'action-sheets-groups-page',
      buttons: [
        {
          text: 'Modificar',
          icon: "brush",
          handler: () => {
            let alerta = this.alertaCtrl.create({ buttons: [{ text: "Actualizar",handler:data=>{
              obj.cantidad = data.texto;
            } }, { text: "Cancelar" }], inputs: [{  type: "number",value:obj.cantidad,name:"texto" }] ,title:"Cantidad en orden"});
            alerta.present();
          }
        },
        {
          text: 'Eliminar',
          icon: "trash",
          handler: () => {
            const alerta = this.alertaCtrl.create({
              title: "Aviso",
              subTitle: "¿Desea eliminar el producto de la orden?",
              buttons: [{
                text: "Aceptar",
                handler: () => {
                  this.order.splice(obj,1);
                  let toast = this.toastCtrl.create({ message: "Productos eliminados", duration: 1500 });
                  toast.present();
                  console.log(this.order);
                }
              },
              {
                text: "Cancelar"
              }]
            });
            alerta.present();
          }
        }, {
          text: 'Cancelar',
          icon: "close",
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    actionSheet.present();

  }
}
