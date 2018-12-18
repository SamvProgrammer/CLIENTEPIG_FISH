import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { RolesProvider } from '../../providers/roles/roles';
import { CarritoProvider } from '../../providers/carrito/carrito';


@Component({
  selector: 'page-usuarios-add',
  templateUrl: 'usuarios-add.html',
})
export class UsuariosAddPage {
  myForm: FormGroup;
  public boton: string = "";
  private id;
  public arregloRoles: any = [];
  public arregloCarrito: any = [];
  private variable;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private usuariosPrd: UsuariosProvider,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private rolesPrd: RolesProvider,
    private carritoPrd: CarritoProvider,
    private toasCtrl:ToastController
  ) {
    this.variable = this.parametros.get("parametro");

    this.boton = this.parametros.get("boton");
    if (this.variable == undefined) {
      const obj = { nombre: "", descripcion: "", precio: 0 }
      this.myForm = this.createMyForm(obj);
    } else {

      this.id = this.variable.id;
      this.myForm = this.createMyForm(this.variable);
    }
    this.arregloRoles = this.rolesPrd.getRoles();
    this.carritoPrd.getCarritos().subscribe(datos => {
      this.arregloCarrito = datos;
    });
  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      usuario: [obj.login, Validators.required],
      nombre: [obj.nombre, Validators.required],
      password1: [obj.password, Validators.required],
      password2: [obj.password, Validators.required],
      roles: [obj.id_rol, Validators.required],
      carritos: [obj.id_carrito, Validators.required]
    });
  }
  saveData() {
    let obj = this.myForm.value;
    let login = obj.usuario;
    let nombre = obj.nombre;
    let password = obj.password1;
    let id_rol = obj.roles;
    let id_carrito = obj.carritos;



    obj = {
      login: login,
      nombre: nombre,
      idRol: id_rol,
      idCarrito:id_carrito,
      password:password,
      nombreRol:this.arregloRoles[id_rol-1].nombre
    }
    
    if (this.boton == "Actualizar") {
      obj.idUser = this.variable.id_user;      
        this.usuariosPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.usuariosPrd.insertar(obj).subscribe(datos => {

         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }
}
