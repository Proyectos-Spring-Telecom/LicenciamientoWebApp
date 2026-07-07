import { fadeInUpAnimation } from './../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from './../../../../../@fury/animations/fade-in-right.animation';
import { User } from './../../../../_entities/User';
import { UsuarioVM } from './../../../../_entities/usuarios/usuarioVM';
import { UsuarioService } from '../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/_entities/enums/permiso.enum';
import Swal from 'sweetalert2';

export enum Permiso2 {
  /* #region Usuarios */
  AgregarUsuario = "4",
  ConsultarUsuarios = "3",
  EliminarUsuario = "6",
  ActualizarUsuario = "5",
  /* #endregion */
}

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})

export class ListaUsuarioComponent implements OnInit {
  public listaUsuarios: UsuarioVM[];
  public datosReporte = [];
  public showNavigationButtons: boolean;
  public showPageSizeSelector: boolean;
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public mensajeModulo: string = 'Usuarios';
  public mensajeAgrupar: string = 'Arrastre un encabezado de columna aquí para agrupar por esa columna';
  isDisabled: boolean = true;
  public detalle: User;
  private _gap: number;
  public id: number;
  public titulo : string = 'Licenciamiento';
  public permisoUsuarios: string;
  public permisoAltaUsuarios: string;
  public permisoActualizarUsuarios: string;
  public permisoEliminarUsuarios: string;

  constructor(private usuarioService: UsuarioService,
    private router: Router) {
      this.showFilterRow = true;
      this.showHeaderFilter = true;
      this.showNavigationButtons = true;
      this.showPageSizeSelector = true;
  }

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerPermisos();
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }
  
  
/*---------------------------------
	Obtener información para el grid
---------------------------------*/
  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response: UsuarioVM[]) => {
        this.listaUsuarios = response;
          response.forEach(usuario => {
            this.datosReporte.push({
              'Nombre': usuario.nombre,
              'Apellido Paterno': usuario.apellidoPaterno,
              'Apellido Materno': usuario.apellidoMaterno,
              'Rol': usuario.rol,
              'Grupo': usuario.grupo,          
              'Correo': usuario.correo,
            });
          });
        if(this.datosReporte.length > 0){
          this.isDisabled = false;
        }
      }, (error) => {
    })
  }
    

/*-------------------------------
	Enrutamiento
-------------------------------*/
  actualizarUsuario(idUsuario: string) {
    this.router.navigateByUrl('/usuario/editar/' + idUsuario);
  }

  AgregarUsuario() {
    this.router.navigateByUrl('/usuario/alta-usuario');
  }

  
/*---------------------------------
	Funciones/Acciones
---------------------------------*/
  obtenerEstatus(estatus) {
    let estado = '';
    switch (estatus) {
      case 0:
        estado = 'Baja';
        break;
    }
    return estado;
  }

  cambiarEstatus(id, estatus) {
    Swal.fire({
      backdrop: ` rgba(19,41,61) `,
      title: '¡Eliminar!',
      text: `¿Está seguro que desea dar de baja al usuario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#52bb56',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if(result.value){
          this.usuarioService.cambiarEstatus(id, estatus).subscribe(
          (response) => {
            this.obtenerUsuarios();
            Swal.fire({
              backdrop: ` rgba(19,41,61) `,
              title: '¡Correcto!',
              text: `¡Se ha dado de baja de manera exitosa el usuario!`,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Confirmar',
            });
          }, (error) => {
          Swal.fire(
            '¡Error en la operación!',
            '¡Error al intentar cambiar el estatus!',
            'error'
          )
        })
      }
    })
  }


/*-------------------------------
	Obtener Permisos Asignados
-------------------------------*/
  public get Permiso() {
    return Permiso;
  }

  obtenerPermisos(){
    this.permisoUsuarios = Permiso.ConsultarUsuarios;
    this.permisoAltaUsuarios = Permiso.AgregarUsuario;
    this.permisoActualizarUsuarios = Permiso.ActualizarUsuario;
    this.permisoEliminarUsuarios = Permiso.EliminarUsuario;
  }
}