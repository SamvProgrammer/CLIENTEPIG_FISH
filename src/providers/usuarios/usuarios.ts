import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';
/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {
  private direccion = "";
  private data:Observable<any>;

  constructor(public http: HttpClient) {
    this.direccion = direcciones.usuarios;
  }

  public getUsuarios():Observable<any>{    
   this.data = this.http.get(this.direccion);
   return this.data;
  }

  public eliminarUsuario(id):Observable<any>{
   this.data = this.http.delete(this.direccion+"/"+id);
   return this.data;
  }

}
