import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';

/*
  Generated class for the CarritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarritoProvider {

  private data:Observable<any>;
  private direccion = "";

  constructor(public http: HttpClient) {
    this.direccion = direcciones.carritos;
  }


  public getCarritos():Observable<any>{   
    this.data = this.http.get(this.direccion);
    return this.data;
   }
}
