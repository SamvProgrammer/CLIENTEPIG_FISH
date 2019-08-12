import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { TicketPage } from '../ticket/ticket';
import { ReportetransaccionesPage } from '../reportetransacciones/reportetransacciones';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { ReportesProvider } from '../../providers/reportes/reportes';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  public arreglo: any = [];
  public arreglo2:any = [];
  public fecha;
  public gender: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private ticktPrd: TicketsProvider,
    private loginPrd: LoginProvider, private carritoPrd: CarritoProvider,private reportePrd: ReportesProvider, private document: DocumentViewer, private platadorma: Platform,
    private alertCtrl: AlertController, private file: File, private ft: FileTransfer,
    private toasCtrl: ToastController, private loadCtrl: LoadingController,private usuariosPrd:UsuariosProvider
  ) {
    let idCarrito = usuariosPrd.getSucursal();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let dia: string = "";
    let mes: string = "";

    if (dd < 10) {
      dia = "0" + dd;
    } else {
      dia = "" + dd;
    }

    if (mm < 10) {
      mes = '0' + mm;
    } else {
      mes = "" + mm;
    }

    this.fecha = yyyy + '-' + mes + '-' + dia;
    this.ticktPrd.getTicketsCanceladosCobrados(idCarrito, undefined).subscribe(datos => {
      this.arreglo = datos;
    });

    this.carritoPrd.getCarritos().subscribe(datos => {
      this.arreglo2 = datos;
      this.gender = idCarrito;
      console.log(this.gender);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

  public buscar() {
    this.ticktPrd.getTicketsCanceladosCobrados(this.gender, this.fecha).subscribe(datos => {
      this.arreglo = datos;
      console.log(this.arreglo);
    });
  }

  public entrarDetalle(obj){
    this.navCtrl.push(TicketPage,{id_ticket:obj.id_ticket});
  }

  public reporte():any{
    const fileTransfer: FileTransferObject = this.ft.create();
    const options: DocumentViewerOptions = {
      title: 'Reporte'
    }

    let cargando = this.loadCtrl.create({ content: "Generando reporte" });
    cargando.present();
    this.reportePrd.getHistoricoCuentas(this.gender).subscribe(datos => {
      cargando.dismiss();
      if (this.platadorma.is('cordova')) {
        let filename = "reporte.pdf";
        const writeDirectory = this.platadorma.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
        this.file.writeFile(writeDirectory, filename, this.convertBaseb64ToBlob(datos.respuesta, 'data:application/pdf;base64'), {replace: true})
        .then(() => {
            
            this.document.viewDocument(writeDirectory+filename,'application/pdf',options);
        })
        .catch(() => {
            console.error('Error writing pdf file');
        });        
      } else {
        console.log(datos);
        let pdfWindow = window.open("")
        pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64," + datos.respuesta+"'></iframe>")
      }
    });
  }

  public convertBaseb64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         const slice = byteCharacters.slice(offset, offset + sliceSize);
         const byteNumbers = new Array(slice.length);
         for (let i = 0; i < slice.length; i++) {
             byteNumbers[i] = slice.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         byteArrays.push(byteArray);
    }
   return new Blob(byteArrays, {type: contentType});
}

}
