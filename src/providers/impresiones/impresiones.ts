import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketsProvider } from '../tickets/tickets';
import { CarritoProvider } from '../carrito/carrito';
import { UsuariosProvider } from '../usuarios/usuarios';
import { CurrencyPipe } from '@angular/common';

/*
  Generated class for the ImpresionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImpresionesProvider {


  private id_sucursal;
  private nombre_sucursal = "";
  private total = 0;

  //Código para fuentes de impresora

  public codigos={
    LF: '\x0a', //Line feed for new lines
    EOL: '\n', //end of line
    FEED_CONTROL_SEQUENCES: {
        CTL_LF: '\x0a', // Print and line feed
        CTL_FF: '\x0c', // Form feed
        CTL_CR: '\x0d', // Carriage return
        CTL_HT: '\x09', // Horizontal tab
        CTL_VT: '\x0b', // Vertical tab
    },
    LINE_SPACING: {
        LS_DEFAULT: '\x1b\x32',  //Spacing
        LS_SET: '\x1b\x33'  //Spacing
    },
    HARDWARE: {
        HW_INIT: '\x1b\x40', // Clear data in buffer and reset modes
        HW_SELECT: '\x1b\x3d\x01', // Printer select
        HW_RESET: '\x1b\x3f\x0a\x00', // Reset printer hardware
    },
    CASH_DRAWER: {
        CD_KICK_2: '\x1b\x70\x00', // Sends a pulse to pin 2 []
        CD_KICK_5: '\x1b\x70\x01', // Sends a pulse to pin 5 []
    },
    MARGINS: {
        BOTTOM: '\x1b\x4f', // Fix bottom size
        LEFT: '\x1b\x6c', // Fix left size
        RIGHT: '\x1b\x51', // Fix right size
    },
    PAPER: {
        PAPER_FULL_CUT: '\x1d\x56\x00', // Full cut paper
        PAPER_PART_CUT: '\x1d\x56\x01', // Partial cut paper
        PAPER_CUT_A: '\x1d\x56\x41', // Partial cut paper
        PAPER_CUT_B: '\x1d\x56\x42', // Partial cut paper
    },
    TEXT_FORMAT: {
        TXT_NORMAL: '\x1b\x21\x00', // Normal text
        TXT_2HEIGHT: '\x1b\x21\x10', // Double height text
        TXT_2WIDTH: '\x1b\x21\x20', // Double width text
        TXT_4SQUARE: '\x1b\x21\x30', // Double width & height text

        TXT_CUSTOM_SIZE: function(width, height) { // other sizes
            var widthDec = (width - 1) * 16;
            var heightDec = height - 1;
            var sizeDec = widthDec + heightDec;
            return '\x1d\x21' + String.fromCharCode(sizeDec);
        },

        TXT_HEIGHT: {
            1: '\x00',
            2: '\x01',
            3: '\x02',
            4: '\x03',
            5: '\x04',
            6: '\x05',
            7: '\x06',
            8: '\x07'
        },
        TXT_WIDTH: {
            1: '\x00',
            2: '\x10',
            3: '\x20',
            4: '\x30',
            5: '\x40',
            6: '\x50',
            7: '\x60',
            8: '\x70'
        },

        TXT_UNDERL_OFF: '\x1b\x2d\x00', // Underline font OFF
        TXT_UNDERL_ON: '\x1b\x2d\x01', // Underline font 1-dot ON
        TXT_UNDERL2_ON: '\x1b\x2d\x02', // Underline font 2-dot ON
        TXT_BOLD_OFF: '\x1b\x45\x00', // Bold font OFF
        TXT_BOLD_ON: '\x1b\x45\x01', // Bold font ON
        TXT_ITALIC_OFF: '\x1b\x35', // Italic font ON
        TXT_ITALIC_ON: '\x1b\x34', // Italic font ON

        TXT_FONT_A: '\x1b\x4d\x00', // Font type A //normal font
        TXT_FONT_B: '\x1b\x4d\x01', // Font type B //small font
        TXT_FONT_C: '\x1b\x4d\x02', // Font type C //normal font

        TXT_ALIGN_LT: '\x1b\x61\x00', // Left justification
        TXT_ALIGN_CT: '\x1b\x61\x01', // Centering
        TXT_ALIGN_RT: '\x1b\x61\x02', // Right justification
    },
    BARCODE_FORMAT: {
        BARCODE_TXT_OFF: '\x1d\x48\x00', // HRI barcode chars OFF
        BARCODE_TXT_ABV: '\x1d\x48\x01', // HRI barcode chars above
        BARCODE_TXT_BLW: '\x1d\x48\x02', // HRI barcode chars below
        BARCODE_TXT_BTH: '\x1d\x48\x03', // HRI barcode chars both above and below

        BARCODE_FONT_A: '\x1d\x66\x00', // Font type A for HRI barcode chars
        BARCODE_FONT_B: '\x1d\x66\x01', // Font type B for HRI barcode chars

        BARCODE_HEIGHT: function(height) { // Barcode Height [1-255]
            return '\x1d\x68' + String.fromCharCode(height);
        },
        // Barcode Width  [2-6]
        BARCODE_WIDTH: {
            1: '\x1d\x77\x02',
            2: '\x1d\x77\x03',
            3: '\x1d\x77\x04',
            4: '\x1d\x77\x05',
            5: '\x1d\x77\x06',
        },
        BARCODE_HEIGHT_DEFAULT: '\x1d\x68\x64', // Barcode height default:100
        BARCODE_WIDTH_DEFAULT: '\x1d\x77\x01', // Barcode width default:1

        BARCODE_UPC_A: '\x1d\x6b\x00', // Barcode type UPC-A
        BARCODE_UPC_E: '\x1d\x6b\x01', // Barcode type UPC-E
        BARCODE_EAN13: '\x1d\x6b\x02', // Barcode type EAN13
        BARCODE_EAN8: '\x1d\x6b\x03', // Barcode type EAN8
        BARCODE_CODE39: '\x1d\x6b\x04', // Barcode type CODE39
        BARCODE_ITF: '\x1d\x6b\x05', // Barcode type ITF
        BARCODE_NW7: '\x1d\x6b\x06', // Barcode type NW7
        BARCODE_CODE93: '\x1d\x6b\x48', // Barcode type CODE93
        BARCODE_CODE128: '\x1d\x6b\x49', // Barcode type CODE128
    },
    CODE2D_FORMAT: {
        TYPE_PDF417: '\x1b\x5a\x00',
        TYPE_DATAMATRIX: '\x1b\x5a\x01',
        TYPE_QR: '\x1b\x5a\x02',
        CODE2D: '\x1b\x5a',
    },
    IMAGE_FORMAT: {
        S_RASTER_N: '\x1d\x76\x30\x00', // Set raster image normal size
        S_RASTER_2W: '\x1d\x76\x30\x01', // Set raster image double width
        S_RASTER_2H: '\x1d\x76\x30\x02', // Set raster image double height
        S_RASTER_Q: '\x1d\x76\x30\x03', // Set raster image quadruple
    },
    BITMAP_FORMAT: {
        BITMAP_S8: '\x1b\x2a\x00',
        BITMAP_D8: '\x1b\x2a\x01',
        BITMAP_S24: '\x1b\x2a\x20',
        BITMAP_D24: '\x1b\x2a\x21'
    },
    GSV0_FORMAT: {
        GSV0_NORMAL: '\x1d\x76\x30\x00',
        GSV0_DW: '\x1d\x76\x30\x01',
        GSV0_DH: '\x1d\x76\x30\x02',
        GSV0_DWDH: '\x1d\x76\x30\x03'
    }
}


  constructor(public http: HttpClient, private ticketsprd: TicketsProvider,
    private sucursalPrd: CarritoProvider, private usuariosPrd: UsuariosProvider,
    private currency: CurrencyPipe) {
    this.id_sucursal = usuariosPrd.getSucursal();
    this.sucursalPrd.getCarritosEspecifico(this.id_sucursal).subscribe(datos => {
      this.nombre_sucursal = datos.nombre;
    });
  }


  public getPreticket(datosTicket) {
   console.log(datosTicket);
    var promise = new Promise((resolve, reject) => {
      this.ticketsprd.getTicketsDetalleAgrupado(datosTicket.id_ticket).subscribe(resultado => {
        console.log("Esto es el epreticket agrupado");
        console.log(resultado);
        let datos = resultado.resultado;
        let promocionesArreglo = resultado.promociones;
        if(datos.length > 0){
          let productosaux = "";
          let f = new Date();
          this.total = 0;
          console.log("Este son los daatos del preticket");
          console.log(datosTicket);
          for (let i of datos) { 
            this.total = this.total + i.precio_total;
            let cantidad = i.cantidad;
            let nombre = i.nombre;
            let unitario = this.currency.transform(i.unitario);
            let precioTotalCantidad = this.currency.transform(i.precio_total);
    
    
            productosaux = productosaux +`${cantidad} `+ nombre   + `\n\t\t${unitario}\t${precioTotalCantidad}\n`
           }
    
          let mensaje = "";
    

          let sucursal = this.codigos.TEXT_FORMAT.TXT_ALIGN_CT+this.codigos.TEXT_FORMAT.TXT_4SQUARE+this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"TICKET DE COMPRA"+this.codigos.LF+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF+this.codigos.TEXT_FORMAT.TXT_NORMAL+this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"PIG&FISH FOODTRUCK"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF+"\n\n"+this.codigos.TEXT_FORMAT.TXT_ALIGN_LT+this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"Sucursal:"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF + this.nombre_sucursal + this.codigos.LF;
          let fecha =this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"Fecha:"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF+ f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
          let mesero = this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"\tMesero:"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF+this.usuariosPrd.getNombreUsuario()+this.codigos.LF;
          let cuenta = this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"Folio:"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF + datosTicket.id_folio + "\t";
          let mesa = this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"Cuenta:"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF+datosTicket.nombre+this.codigos.LF+this.codigos.LF+this.codigos.TEXT_FORMAT.TXT_ALIGN_CT+this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"PRODUCTOS CONSUMIDOS"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF+this.codigos.LF+this.codigos.LF;
          let productos =this.codigos.TEXT_FORMAT.TXT_NORMAL+this.codigos.TEXT_FORMAT.TXT_FONT_B+this.codigos.TEXT_FORMAT.TXT_ALIGN_LT+this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"Cant. | Nombre\t| Precio\t| Importe"+this.codigos.LF+"______________________________________"+this.codigos.LF+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF+ productosaux+this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"\n______________________________________\n";
          let total = "\tTotal:" + this.currency.transform(this.total)+"\n\t----------------\n";
          let promociones = "\n\n";
          let final = this.codigos.TEXT_FORMAT.TXT_ALIGN_CT+"GRACIAS POR SU PREFERENCIA\n\n\n-------------------------------\n\n";
          console.log(promocionesArreglo);
          if(promocionesArreglo != undefined){
            if(promocionesArreglo.length != 0){
              let totalPromociones = 0;
              let totalProductos = 0;
              let totalNeto = 0;
                for(let promocionItem of promocionesArreglo){
                    promociones = promociones + this.codigos.TEXT_FORMAT.TXT_ALIGN_CT+this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"PROMOCIONES"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF+this.codigos.TEXT_FORMAT.TXT_ALIGN_LT+this.codigos.LF;
                    let productospromociones = promocionItem.productos;
                    let anexaMensaje = "";
                    totalPromociones = totalPromociones + (promocionItem.totalPromocion * promocionItem.precio);
                    
                    for(let auxpromo of productospromociones){
                        anexaMensaje = anexaMensaje + auxpromo.nombre+this.codigos.LF;
                        anexaMensaje = anexaMensaje +  `\n\t\t${auxpromo.cantidad}\t${this.currency.transform(auxpromo.total)}\n`
                        totalProductos = totalProductos + auxpromo.total;
                    }
                    
                    totalNeto = this.total - totalProductos;
                    totalNeto = totalNeto + totalPromociones; 
                    
                   
                    

                    promociones = promociones + anexaMensaje;
                    promociones = promociones +this.codigos.TEXT_FORMAT.TXT_BOLD_ON+"Aplicando descuento\n"+this.codigos.TEXT_FORMAT.TXT_BOLD_OFF;
                    promociones = promociones +promocionItem.totalPromocion+" "+ promocionItem.nombre+"\n\t\t"+this.currency.transform(promocionItem.precio)+"\t"+this.currency.transform(promocionItem.precio*promocionItem.totalPromocion)+this.codigos.LF+"______________________________________\n";
                }
                promociones = promociones + this.codigos.TEXT_FORMAT.TXT_BOLD_ON + "Total a pagar:\t"+this.currency.transform(totalNeto)+"\n\n\n"
            }
          }
    
          mensaje = sucursal+fecha+mesero + cuenta +mesa + productos  + total + promociones + final;
          console.log(mensaje);
          console.log(promocionesArreglo);
          resolve(mensaje);
        }else{
          reject("Mesa no contiene productos ordenados.");
        }
      });
    });
    return promise;
    

  }


  public getCodigosImpresora(){
    return this.codigos;
  }
}
