import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RolesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RolesProvider {
  private roles = [{id:1,nombre:"Administrador",permiso:1},{id:2,nombre:"Mesero",permiso:2},{id:3,nombre:"Inventarios",permiso:3}]
  constructor() {
    
  }


  public  getRoles():any{

    return this.roles;
  }
}
