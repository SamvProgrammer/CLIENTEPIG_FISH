import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';

/*
  Generated class for the TicketsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TicketsProvider {

  private data:Observable<any>;
  private direccion = "";

  constructor(public http: HttpClient) {
    this.direccion = direcciones.tickets;
  }

  public getTickets(id_carrito):Observable<any>{   
    let filtrarDireccion = this.direccion +"/carrito/"+id_carrito;
    this.data = this.http.get(filtrarDireccion);
    return this.data;
   }

   public insert(obj):Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(obj);
    return this.http.post(this.direccion,json,httpOptions);
   }
}
