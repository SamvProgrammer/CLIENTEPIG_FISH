import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {
  private direccion = "";
  private data:Observable<any>;

  constructor(public http: HttpClient,private toas:ToastController) {
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

  public insertar(obj):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(obj);
    return this.http.post(this.direccion,json,httpOptions);
  }

  public modificar(obj):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(obj);
    return this.http.put(this.direccion,json,httpOptions);
  }

  public getUsuarioEspecifico(usuario):Observable<any>{    
 
    console.log(usuario);
    this.data = this.http.get(this.direccion+"/buscarusuario/"+usuario);
    return this.data;
   }
  

}
