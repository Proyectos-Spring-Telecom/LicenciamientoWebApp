import { ListaTipoFoto } from 'src/app/_entities/local-comercial/Catalogos/tipoFoto';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
 import { LocalComercial } from '../../../../_entities/local-comercial/local-comercial';// import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from './../../../auth/services/auth.service';
import { User } from './../../../../_entities/User';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { transform } from 'lodash-es';
import { Permiso } from 'src/app/_entities/enums/permiso.enum';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { LocalComercialService } from 'src/app/pages/local-comercial/services/local-comercial.service';
import { Customer, Service } from './app.service';

@Component({
  selector: 'fury-lista-alumbrado',
  templateUrl: './lista-alumbrado.component.html',
  styleUrls: ['./lista-alumbrado.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [Service],
})
export class ListaAlumbradoComponent implements OnInit {

  public listaLocales: LocalComercial[];
  customers: Customer[];
  
  public datosReporte = [];
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeModulo: string = 'Locales Comerciales';
  public mensajeAgrupar: string =
    'Arrastre un encabezado de columna aquí para agrupara por esa columna';
  public isDisabled: boolean = true;
  public titulo: string = 'Sistema de Alumbrado Público';

  public permisoAgregarLuminaria : string;
  public permisoConsultarLuminarias : string;
  public permisoActualizarLuminarias : string;
  public permisoEliminarLuminaria : string;
  public permisoVisualizarDetalleLuminaria : string;
  

  public fechaInicio;
  public fechaFinal;
  public loadingMessage: string = 'Cargando...';
  public showTable: boolean = false;
  public detalle: User;
	private _gap: number;
	public interval = null;

  constructor(private router: Router,
              private datepipe: DatePipe,
              service: Service,
			        public AuthService: AuthService,
              private localComercialService: LocalComercialService) {
			        this.showHeaderFilter = true;
              this.customers = service.getCustomers();
              this.showFilterRow = true;
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit(){
    this.obtenerListaAlumbrado();
    this.obtenerPermisos();
  }

  obtenerListaAlumbrado() {
    this.loadingMessage = 'Cargando...'
      this.localComercialService.obtenerListaLocalComercial().subscribe(
        (response) => {
          this.listaLocales = response;
          response.forEach(listaLocales => {
             this.datosReporte.push({
         'RFC': listaLocales.rfc,
               'Nombre Comercial': listaLocales.nombreComercial,
               'Giro': listaLocales.giro,
               'Capturista': listaLocales.nombreCapturista,
               'Estatus': listaLocales.nombreEstatus,
               'Fecha Expedicion': this.datepipe.transform(listaLocales.fechaHora, 'yyyy-MM-dd - HH:mm:ss'),
             });
           });
  
          if(this.datosReporte.length){
            this.isDisabled = false;
          }
  
        }, (error) => {
      })
    }

    detalleLocal(){
      this.router.navigateByUrl('/alumbrado/detalle-alumbrado')
    }

    dashboard(){
      this.router.navigateByUrl('/alumbrado/dashboard-alumbrado')
    }

    agregarLuminaria(){
      this.router.navigateByUrl('/alumbrado/alta-alumbrado')
    }

    public get Permiso() {
      return Permiso;
    }
  
    obtenerPermisos(){
      this.permisoConsultarLuminarias = Permiso.ConsultarLuminarias;
      this.permisoAgregarLuminaria = Permiso.AgregarLuminaria;
      this.permisoActualizarLuminarias = Permiso.ActualizarLuminarias;
      this.permisoEliminarLuminaria = Permiso.EliminarLuminaria;
      this.permisoVisualizarDetalleLuminaria = Permiso.VisualizarDetalleLuminarias;
      // this.permisoBajaLocal = Permiso.BajaLocal;
    }

}