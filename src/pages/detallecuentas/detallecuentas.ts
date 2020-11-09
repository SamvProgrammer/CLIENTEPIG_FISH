import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Slides, ToastController, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { ProductoscategoriasProvider } from '../../providers/productoscategorias/productoscategorias';
import { DetallecuentasProductosPage } from '../detallecuentas-productos/detallecuentas-productos';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { DetallecuentasResumenPage } from '../../pages/detallecuentas-resumen/detallecuentas-resumen';
import { CuentasDetalleAntesdeenviarPage } from '../cuentas-detalle-antesdeenviar/cuentas-detalle-antesdeenviar';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-detallecuentas',
  templateUrl: 'detallecuentas.html',
})
export class DetallecuentasPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  public valor = 1;
  public arreglo = [];
  public orden: any;
  public folio: any;
  public detalle: any = [];
  public total = 0;
  public servidosTodos = true;
  public arregloCategoria: any = [];
  public arregloPedidoCliente: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, private toastCtrl: ToastController, private alertaCtrl: AlertController, private actionSheetCtrl: ActionSheetController,
    private categoriasPrd: ProductoscategoriasProvider, private modalCtrl: ModalController,
    private ticketsPrd: TicketsProvider,private storage:Storage) {

    this.orden = navParams.get("orden");//nombre del cliente
    this.folio = navParams.get("folio");//Folio de la cuenta

    this.storage.get("listaproductosdetallemesa").then(valor => {
      this.arreglo = valor.listaproductos;
      console.log(this.arreglo);
      console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
      for (let item of this.arreglo) {
        let nombre = item["nombre"];
        switch (nombre) {
          case "TACOS":
            item["imagen"] = "../../assets/icon/taco.png";
            break;
          case "BEBIDAS":
            item["imagen"] = "../../assets/icon/soda.png";
            break;
          case "CHAPATAS":
            item["imagen"] = "../../assets/icon/pan-de-molde.png";
            break;
          case "ENTRADAS":
            item["imagen"] = "../../assets/icon/iniciar-sesion.png";
            break;
          case "COSTRAS":
            item["imagen"] = "../../assets/icon/taco1.png";
            break;
          case "PAPAS":
            item["imagen"] = "../../assets/icon/comida.png";
            break;
          case "Postres":
            item["imagen"] = "../../assets/icon/helado.png";
            break;
          case "Kilos":
            item["imagen"] = "../../assets/icon/peso.png";
            break;
            case "Promos":
            item["imagen"] = "../../assets/icon/mejor-precio.png";
            break;
            case "Ensaladas":
            item["imagen"] = "../../assets/icon/ensalada.png";
            break;
            case "Tostadas":
            item["imagen"] = "../../assets/icon/tortilla.png";
            break;
            case "Ordenes ":
            item["imagen"] = "../../assets/icon/orden.png";
            break;
          default:
            item["imagen"] = "../../assets/icon/iconcatalogos.png";
        }
      }
      for (let x of this.arreglo) {
        for (let y of x.productos) {
          y.cantidad = 1;
          y.ruta_imagen = "data:image/png;base64," + y.ruta_imagen;
        }
      }
    });

    this.ticketsPrd.getTicketsDetalle(this.folio).subscribe(datos => {
      console.log("Este es el detalle del ticket");
      console.log(datos);
      this.detalle = datos;
      this.total = 0;
      for (let item of datos) {
        if (item.cancelado == true) {
          item.cantidad = 0;
        }
        this.total = this.total + (item.cantidad * item.precio);
        if (this.servidosTodos == true) {
          if (item.servido == false) {
            this.servidosTodos = false;
          }
        }
      }
    });

    this.arregloPedidoCliente.cliente1 = [];

    this.storage.get(this.folio).then(storagepedido => {
      if (storagepedido != null || storagepedido != undefined) {
        this.arregloPedidoCliente = storagepedido;
      }
    });
  }

  // Initialize slider
  ionViewDidEnter() {
    this.slideChanged();
  }
  ionViewDidLeave() {
    this.storage.set(this.folio, this.arregloPedidoCliente);
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
    let ventana = this.modalCtrl.create(CuentasDetalleAntesdeenviarPage, { arreglo: this.arregloPedidoCliente, orden: this.orden });
    ventana.present();
    ventana.onDidDismiss(datos => {
      if (datos != null || datos != undefined) {
        if (datos.servido == true) {
          for (let llave in this.arregloPedidoCliente) {
            for (let item of this.arregloPedidoCliente[llave]) {
              item.servido = true;
            }
          }
        }
        console.log("SE va a guardar");
        this.storage.set(this.folio, this.arregloPedidoCliente);
      }
    });
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
            let alerta = this.alertaCtrl.create({
              buttons: [{ text: "Cancelar" }, {
                text: "Actualizar", handler: data => {
                  obj.cantidad = data.texto;
                  let objenviar = {
                    id: obj.id,
                    cantidad: obj.cantidad,
                    cancelado: false
                  }

                  this.ticketsPrd.actualizarDetalleTicket(obj).subscribe(respues1 => {
                    let toas = this.toastCtrl.create({ message: respues1.respuesta, duration: 1500 });
                    toas.present();
                    this.ticketsPrd.getTicketsDetalle(this.folio).subscribe(datos => {
                      this.detalle = datos;
                      this.total = 0;
                      for (let item of datos) {
                        if (item.cancelado == true) {
                          item.cantidad = 0;
                        }
                        this.total = this.total + (item.cantidad * item.precio);
                        if (this.servidosTodos == true) {
                          if (item.servido == false) {
                            this.servidosTodos = false;
                          }
                        }
                      }
                    });
                  });
                }
              }], inputs: [{ type: "number", value: obj.cantidad, name: "texto" }], title: "Cantidad en orden"
            });
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
                  this.ticketsPrd.eliminarDetalleTicket(obj.id).subscribe(respu => {
                    let toast = this.toastCtrl.create({ message: "Productos eliminados", duration: 1500 });
                    toast.present();
                    this.ticketsPrd.getTicketsDetalle(this.folio).subscribe(datos => {
                      this.detalle = datos;
                      this.total = 0;
                      for (let item of datos) {
                        if (item.cancelado == true) {
                          item.cantidad = 0;
                        }
                        this.total = this.total + (item.cantidad * item.precio);
                        if (this.servidosTodos == true) {
                          if (item.servido == false) {
                            this.servidosTodos = false;
                          }
                        }
                      }
                    });
                  });

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

  public agregar(obj): any {
    let modal = this.modalCtrl.create(DetallecuentasProductosPage, { id: obj.id, folio: this.folio,productos:obj.productos,pedidosCliente:this.arregloPedidoCliente });
    modal.present();

    modal.onDidDismiss((datos) => {

      this.ticketsPrd.getTicketsDetalle(this.folio).subscribe(datos => {
        this.total = 0;
        for (let item of datos) {
          if (item.cancelado == true) {
            item.cantidad = 0;
          }
          this.total = this.total + (item.cantidad * item.precio);
        }
        this.detalle = datos;
      });
    });

  }

  public cobrar(): any {

    if (this.servidosTodos == false) {
      let mensaje = this.toastCtrl.create({ message: "Faltan productos por servir", duration: 1500 });
      mensaje.present();
      return;
    }

    let modal = this.modalCtrl.create(DetallecuentasResumenPage, { id_ticket: this.folio });
    modal.present();

    modal.onDidDismiss(datos => {
      if (datos) {
        this.viewCtrl.dismiss({ id_ticket: datos.id_ticket, billete: datos.billete });
      }
    });
  }

 



  public cancelardetalle(obj): any {
    let alerta = this.alertaCtrl.create({
      title: "Aviso",
      message: "¿Desea cancelar el producto?",
      buttons: [{
        text: "Sí", handler: () => {
          let objenviar = {
            id: obj.id,
            cantidad: obj.cantidad,
            cancelado: true
          }

          this.ticketsPrd.cancelarDetalleTicket(objenviar).subscribe(respuesta => {
            let toas = this.toastCtrl.create({ message: "Producto cancelado", duration: 1500 });
            toas.present();
            this.ticketsPrd.getTicketsDetalle(this.folio).subscribe(datos => {
              this.detalle = datos;
              this.total = 0;
              for (let item of datos) {
                if (item.cancelado == true) {
                  item.cantidad = 0;
                }
                this.total = this.total + (item.cantidad * item.precio);
                if (this.servidosTodos == true) {
                  if (item.servido == false) {
                    this.servidosTodos = false;
                  }
                }
              }
            });
          });
        }
      }, { text: "No" }]
    });
    alerta.present();
  }

}
