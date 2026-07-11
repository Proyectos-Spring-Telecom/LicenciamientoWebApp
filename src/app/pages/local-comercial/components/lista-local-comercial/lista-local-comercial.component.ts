import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from './../../../auth/services/auth.service';
import { User } from './../../../../_entities/User';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { Permiso } from 'src/app/_entities/enums/permiso.enum';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { LocalComercial } from 'src/app/_entities/local-comercial/local-comercial';
import { LocalComercialService } from '../../services/local-comercial.service';
import { fadeOutAnimation } from 'src/@fury/animations/route.animation';
import { scaleInAnimation } from 'src/@fury/animations/scale-in.animation';
import { routeAnimations } from 'src/@fury/animations/route.animations';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-lista-local-comercial',
  templateUrl: './lista-local-comercial.component.html',
  styleUrls: ['./lista-local-comercial.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation, fadeOutAnimation, scaleInAnimation, routeAnimations]
})

export class ListaLocalComercialComponent implements OnInit, AfterViewInit {
  @ViewChild('targetGroup', { static: false }) validationGroup: DxValidationGroupComponent;
  public listaLocales: LocalComercial[];
  public datosReporte = [];
  public mensajeModulo: string = 'Locales Comerciales';
  public titulo: string = 'Licenciamiento';

  public permisoLocales: string;
  public permisoAltaLocales: string;
  public permisoActualizarLocales: string;
  public permisoEliminarLocales: string;
  public permisoBajaLocal: string;
  public permisoVisualizarDetalle: string;

  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public showShared : boolean = false;
  public loadingVisible: boolean = false;
  public isDisabled: boolean = true;
  public mensajeAgrupar: string = "Arrastre un encabezado de columna aquí para agrupar por esa columna"
  public loadingMessage: string = 'Cargando...';
  public interval = null;

  private _gap = 16;
  gap = `${this._gap}px`;
  col2 = `1 1 calc(50% - ${this._gap / 2}px)`;
  col3 = `1 1 calc(33.3333% - ${this._gap / 1.5}px)`;

  public fechaInicio;
  public fechaFinal;
  public showTable: boolean = false;
  public detalle: User;
  public showButtonReload: boolean = false;
  public readonly defaultImage = 'assets/default.png';

  resolveFotoRuta(ruta: string | null | undefined): string {
    if (ruta == null || ruta === undefined) {
      return this.defaultImage;
    }

    const trimmed = String(ruta).trim();

    if (trimmed === '' || trimmed.toLowerCase() === 'null') {
      return this.defaultImage;
    }

    const normalized = decodeURIComponent(trimmed).toLowerCase();

    if (normalized.includes('default.png')) {
      return this.defaultImage;
    }

    return trimmed;
  }

  formatGridText(value: unknown): string {
    if (value == null || value === undefined) {
      return 'Sin Información';
    }

    const text = String(value).trim();

    if (text === '' || text.toLowerCase() === 'null') {
      return 'Sin Información';
    }

    return text;
  }

  onGridImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    if (img && !img.src.includes('default.png')) {
      img.src = this.defaultImage;
    }
  }

  private normalizeListaLocales(locales: LocalComercial[]): LocalComercial[] {
    return (locales || []).map((item) => ({
      ...item,
      urlLicencia: this.resolveFotoRuta(item.urlLicencia),
      rfc: this.formatGridText(item.rfc),
      nombreComercial: this.formatGridText(item.nombreComercial),
      giro: this.formatGridText(item.giro),
      nombreCapturista: this.formatGridText(item.nombreCapturista),
      nombreEstatus: this.formatGridText(item.nombreEstatus),
    }));
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  constructor(
	  private router: Router,
	  private datepipe: DatePipe,
	  private localComercialService: LocalComercialService) {
		this.showHeaderFilter = true;
        this.showFilterRow = true;
  	}

	ngOnInit() {
		this.inicializarRangoFechas();
		this.obtenerPermisos();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.obtenerListaLocalesComerciales(this.fechaInicio, this.fechaFinal);
		});
	}

	private inicializarRangoFechas(): void {
		const hoy = new Date();
		this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1, 0, 0, 0);
		this.fechaFinal = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);
	}
	
/*-------------------------------
	Refresh Automático
-------------------------------*/
  	ngAfterContentInit() {
		this.interval = setInterval(async () => {
			this.showButtonReload = true;
		}, 180000);
	}

	onShown() {
		setTimeout(() => {
		  this.loadingVisible = false;
		}, 2000);
	  }

	ngOnDestroy() {
		clearInterval(this.interval);
	}


/*------------------------------------
	Obtención de Información en grids
------------------------------------*/
    obtenerListaLocalesComerciales(fechaInicio, fechaFinal) {
	 	if (this.validationGroup?.instance?.validate().isValid) {
			this.loadingMessage = 'Cargando...'
	 		this.loadingVisible = true;
			this.showTable = false;
			this.showShared = true;
	 		
	 		fechaInicio = this.datepipe.transform(fechaInicio, 'yyyy-MM-dd HH:mm:ss');
	 		fechaFinal = this.datepipe.transform(fechaFinal, 'yyyy-MM-dd HH:mm:ss');
	 		this.listaLocales = [];

	 		setTimeout(() => {
	 			this.loadingMessage = 'Esto puede tardar unos segundos...';
	 		}, 30000);

	 		this.localComercialService.obtenerListaLocal(fechaInicio, fechaFinal).pipe(
	 			finalize(
	 				() => this.loadingVisible = false
	 			)
	 		).subscribe(
	 			(response: LocalComercial[]) => {
	 				if (response.length > 0) {
						this.loadingMessage = 'Cargando...'
	 					this.listaLocales = this.normalizeListaLocales(response);
	 					this.showTable = true;
	 					this.crearReporte(response);
	 				} else {
	 					this.isDisabled = true;
	 					this.showTable = false;
						 Swal.fire({
							backdrop: ` rgba(19,41,61) `,
							 title: '¡Oops!',
							 text: `¡No existen datos en ese rango de fechas!`,
							 icon: 'question',
							 confirmButtonText: 'Ok',
						});
	 				}
				},(err) => {
					console.log(err);
				 }
			 )
	 	}
	}
	
	obtenerListaLocalComercial() {
		this.localComercialService.obtenerListaLocalComercial().pipe(
			finalize(
				() => this.loadingVisible = false
			)
		).subscribe(
		(response) => {
			this.listaLocales = this.normalizeListaLocales(response);
			this.listaLocales.forEach(listaLocales => {
			this.datosReporte.push({
				'RFC': listaLocales.rfc,
				'Nombre Comercial': listaLocales.nombreComercial,
				'Giro': listaLocales.giro,
				'Capturista': listaLocales.nombreCapturista,
				'Estatus': listaLocales.nombreEstatus,
				'Fecha Expedicion': this.datepipe.transform(listaLocales.fechaHora, 'yyyy-MM-dd - HH:mm:ss'),
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
  AgregarLocal(){
    this.router.navigateByUrl('/local-comercial/alta-local-comercial')
  }

  EditarLocal(id: number){
    this.router.navigateByUrl('/local-comercial/actualizar-local-comercial/' + id )
  }

  detalleLocal(id: number){
	  this.onShown();
    this.router.navigateByUrl('/local-comercial/detalle-local-comercial/' + id)
  }


/*---------------------------------
	Funciones/Acciones
---------------------------------*/
  	crearReporte(reporte: LocalComercial[]) {
		this.datosReporte = [];
		reporte.forEach(listaLocales => {
			this.datosReporte.push({
				'RFC': listaLocales.rfc,
				'Nombre Comercial': listaLocales.nombreComercial,
				'Giro': listaLocales.giro,
				'Capturista': listaLocales.nombreCapturista,
				'Estatus': listaLocales.nombreEstatus,
				'Fecha Expedicion': this.datepipe.transform(listaLocales.fechaHora, 'yyyy-MM-dd - HH:mm:ss'),
			});
			if (this.datosReporte.length > 0) {
				this.isDisabled = false;
			}
		});
	}

	reload(){
		this.obtenerListaLocalComercial();
		this.loadingMessage = 'Actualizando...';
		this.loadingVisible = true;
		this.onShown();
		this.showButtonReload = false;
	}

  	cambiarEstatuss(id, nombreEstatus) {
		Swal.fire({
			backdrop: `rgba(19,41,61) `,
			title: '¡Atención!',
			text: `¿Está seguro que desea eliminar el local comercial?`,
			footer: '<b>La información ya no podrá estar disponible</b>.',
			// text: 'La información se borrara de manera permantente.',
				icon: 'question',
				showCancelButton: true,
				confirmButtonColor: '#52bb56',
				cancelButtonColor: '#fb434a',
				confirmButtonText: 'Confirmar',
				cancelButtonText: "Cancelar"
			}).then((result) => {
			if (result.value) {
				this.localComercialService.cambiarEstatus(id, nombreEstatus).subscribe(
					(response) => {
						this.obtenerListaLocalComercial();
						Swal.fire({
							backdrop: ` rgba(19,41,61) `,
							 title: '¡Correcto!',
							 text: `¡Se ha dado de baja de manera exitosa el local comercial!`,
							 icon: 'success',
							 confirmButtonColor: '#3085d6',
							 confirmButtonText: 'Confirmar',
						});
					}, (error) => {
						Swal.fire({
							backdrop: ` rgba(19,41,61) `,
							 title: '¡Ops!',
							 text: `¡Error al intentar dar de baja el local comercial!`,
							 icon: 'error',
							 confirmButtonColor: '#3085d6',
							 confirmButtonText: 'Confirmar',
						});
					}
				)
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
		this.permisoLocales = Permiso.ConsultarLocalesComerciales;
		this.permisoAltaLocales = Permiso.AgregarLocalComerial;
		this.permisoActualizarLocales = Permiso.ActualizarLocalComercial;
		this.permisoEliminarLocales = Permiso.EliminarLocalComercial;
		this.permisoVisualizarDetalle = Permiso.VisualizarDetalle;
	}

}