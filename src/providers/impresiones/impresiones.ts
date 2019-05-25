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


  private total = 0;

  constructor(public http: HttpClient, private ticketsprd: TicketsProvider,
    private sucursalPrd: CarritoProvider, private usuariosPrd: UsuariosProvider,
    private currency: CurrencyPipe) {
  }


  public getPreticket(datosTicket) {
    var promise = new Promise((resolve, reject) => {
      this.sucursalPrd.getCarritosEspecifico(this.usuariosPrd.getSucursal()).subscribe(datoscarrito=>{
        console.log(datoscarrito);
        this.ticketsprd.getTicketsDetalleAgrupado(datosTicket.id_ticket).subscribe(datos => {
          if(datos.length > 0){
            let productosaux = "";
            let f = new Date();
            this.total = 0;
            for (let i of datos) { 
              this.total = this.total + i.precio_total;
              let cantidad = i.cantidad;
              let nombre = i.nombre;
              let unitario = this.currency.transform(i.unitario);
              let precioTotalCantidad = this.currency.transform(i.precio_total);
      
      
              productosaux = productosaux + cantidad + " " + nombre + "\t" + precioTotalCantidad + "\n";
             }
      
            let mensaje = "";
      
            let sucursal = "\tTICKET DE COMPRA\n\n\tPIG&FISH FOODTRUCK\n\n\nSucursal: " + datoscarrito.nombre + "\n";
            let fecha ="Fecha:\t"+ f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()+"\n";
            let mesero = "Mesero:\tSantiago\n";
            let cuenta = "Folio:\t" + datosTicket.id_folio + "\n";
            let mesa = "Cuenta:\t"+datosTicket.nombre+"\n\n";
            let lineas = "--------------------------------\n";
            let lineas2 = "\tProductos consumidos\n";
            let productos = productosaux+"\n";
            let total = "\t\tTotal:\t" + this.currency.transform(this.total)+"\n\n\n\n\n  GRACIAS POR SU PREFERENCIA\n\n\n\n\n";
      
      
            mensaje = sucursal+fecha+mesero + cuenta +mesa+ lineas + lineas2 +lineas+"\n"+ productos + lineas + total;
            resolve(mensaje);
          }else{
            reject("Mesa no contiene productos ordenados.");
          }
        });
      });
    });
    return promise;
    

  }

}
