import { fadeInRightAnimation } from './../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from './../../../../../@fury/animations/fade-in-up.animation';
import { Component, OnInit } from '@angular/core';
import { PermisoService } from '../../services/permiso.service';
import { PermisosModule } from './../../../../_entities/permisos-module/permiso-module';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/_entities/enums/permiso.enum'; 


@Component({
  selector: 'app-lista-permiso',
  templateUrl: './lista-permiso.component.html',
  styleUrls: ['./lista-permiso.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListaPermisoComponent implements OnInit {
  public listaPermisos: PermisosModule[];
  public datosReporte = [];
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeModulo: string = 'Permisos';
  public mensajeAgrupar: string =
    'Arrastre un encabezado de columna aquí para agrupar por esa columna';
  isDisabled: boolean = true;
  public permisoConsultarPermisos: string;
	public permisoAgregarPermiso: string;
	public permisoActualizarPermiso: string;
	public permisoEliminarPermiso: string;
  public titulo: string = 'Licenciamiento';

  constructor(private permisoService: PermisoService,
    private router: Router) {
    this.showFilterRow = true;
    this.showHeaderFilter = true;
  }

  ngOnInit() {
    this.obtenerListaPermisos();
    this.obtenerPermisos();
  }

/*---------------------------------
	Obtener información para el grid
---------------------------------*/
  obtenerListaPermisos() {
    this.permisoService.obtenerPermisos().subscribe(
      (permisos: PermisosModule[]) => {
        this.listaPermisos = permisos;
        this.listaPermisos.forEach((permiso) => {
          this.datosReporte.push({
            Nombre: permiso.nombrePermiso,
            Descripción: permiso.descripcionPermiso,
            Módulo: permiso.nombreModulo,
          });
        });
      if (this.datosReporte.length > 0) {
        this.isDisabled = false;
      }
    });
  }


/*---------------------------------
	Enrutamiento
---------------------------------*/
  agregarPermiso() {
    this.router.navigateByUrl('/permiso/alta-permiso');
  }

  actualizarPermiso(idPermiso: String) {
    this.router.navigateByUrl('/permiso/editar/' + idPermiso);
  }


/*---------------------------------
	Funcionaes/Acciones
---------------------------------*/
  eliminarPermiso(permiso: PermisosModule) {
    Swal.fire({
      backdrop: ` rgba(19,41,61) `,
      title: '¡Eliminar!',
      text: `¿Está seguro que desea eliminar el permiso ${permiso.descripcionPermiso}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#52bb56',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {
        this.permisoService.eliminarPermiso(permiso.idPermiso).subscribe(
          (response) => {
            Swal.fire({
              backdrop: ` rgba(19,41,61) `,
              title: 'Correcto!',
              text: `¡Ha sido eliminado de manera exitosa el permiso!`,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Confirmar',
              });
            this.obtenerListaPermisos();
          },
          (error) => {
            Swal.fire(
              '¡Ops!',
              '¡Error al intentar eliminar el permiso!',
              'error'
            );
          }
        );
      }
    });
  }


/*-------------------------------
	Obtener Permisos Asignados
-------------------------------*/
  public get Permiso(){
		return Permiso;
	}

	public obtenerPermisos(){
		this.permisoConsultarPermisos = Permiso.ConsultarPermisos;
		this.permisoAgregarPermiso = Permiso.AgregarPermiso;
		this.permisoActualizarPermiso = Permiso.ActualizarPermiso;
		this.permisoEliminarPermiso = Permiso.EliminarPermiso;
	}
}
