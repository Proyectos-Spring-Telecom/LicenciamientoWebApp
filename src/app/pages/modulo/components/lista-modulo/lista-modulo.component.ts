import { fadeInRightAnimation } from './../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from './../../../../../@fury/animations/fade-in-up.animation';
import { Modulo } from './../../../../_entities/modulos/modulo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuloService } from '../../services/modulo.service';
import { Permiso } from 'src/app/_entities/enums/permiso.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-modulo',
  templateUrl: './lista-modulo.component.html',
  styleUrls: ['./lista-modulo.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})

export class ListaModuloComponent implements OnInit {

  public listaModulos: Modulo[];
  public datosReporte = [];
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeModulo: string = "Módulos";
  public mensajeAgrupar: string = "Arrastre un encabezado de columna aquí para agrupar por esa columna"
  isDisabled: boolean = true;
  public titulo: string = 'Licenciamiento';
  public permisoConsultarModulos: string;
  public permisoAgregarModulo: string;
  public permisoActualizarModulo: string;
  public permisoEliminarModulo: string;
  
  constructor(
    private moduloService: ModuloService,
    private router: Router) {
      this.showFilterRow = true;
      this.showHeaderFilter = true;
    }
  
  ngOnInit() {
    this.obtenerListaModulos();
    this.obtenerPermmisos();
  }


/*------------------------------------
	Obtención de Información en grids
------------------------------------*/  
  obtenerListaModulos() {
    this.moduloService.obtenerModulos().subscribe(
      (modulos: Modulo[]) => {
        const ids: Number[] = [1, 2, 3, 4, 13, 14, 16, 17, 20, 21, 23, 24];
        let moduls = [];
        modulos.forEach(modulo => {
          if(!(ids.includes(modulo.id))){
            moduls.push(modulo);
          }
        });
        this.listaModulos = modulos;
        this.listaModulos.forEach(modulo => {
          this.datosReporte.push({
            'ID': modulo.id,
            'Nombre':  modulo.nombre
          });
      });
      if(this.datosReporte.length > 0) {
        this.isDisabled = false;
      }
    });
  }


/*-------------------------------
	Enrutamiento
-------------------------------*/
  agregarModulo() {
    this.router.navigateByUrl('/modulo/alta-modulo');
  }
  
  actualizarModulo(idModulo: Number) {
    this.router.navigateByUrl('/modulo/editar/' + idModulo);
  }


/*---------------------------------
	Funcionaes/Acciones
---------------------------------*/
  eliminarModulo(modulo: Modulo) {
    Swal.fire({
      backdrop: ` rgba(19,41,61) `,
      title: '¡Eliminar!',
      text: `¿Está seguro que desea eliminar el módulo ${modulo.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#52bb56',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {
        this.moduloService.eliminarModulo(modulo.id).subscribe(
          (response) => {
            Swal.fire({
              backdrop: ` rgba(19,41,61) `,
              title: 'Correcto!',
              text: `¡Ha sido eliminado de manera exitosa el módulo!`,
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Confirmar',
              });
            this.obtenerListaModulos();
        }, (error) => {
          Swal.fire(
            '¡Ops!',
            '¡Error al intentar eliminar el módulo',
            'error'
          );
        });
      }
    });
  }
  

/*-------------------------------
	Obtener Permisos Asignados
-------------------------------*/
  public get Permiso() {
    return Permiso;
  }
  
  obtenerPermmisos(){
    this.permisoConsultarModulos = Permiso.ConsultarModulo;
    this.permisoAgregarModulo = Permiso.AgregarModulo;
    this.permisoActualizarModulo = Permiso.ActualizarModulo;
    this.permisoEliminarModulo = Permiso.EliminarModulo;
  }
  
}