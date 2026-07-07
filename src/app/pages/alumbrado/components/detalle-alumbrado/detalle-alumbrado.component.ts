import { fadeInRightAnimation } from './../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from './../../../../../@fury/animations/fade-in-up.animation';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalComercialService } from './../../../local-comercial/services/local-comercial.service';
import { Component, OnInit, inject, ElementRef, ViewChild, enableProdMode, Inject, Input, } from '@angular/core';
import { DetalleLocal } from './../../../../_entities/local-comercial/detalle-local-comercial';
import Swal from 'sweetalert2';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import StreetViewService = google.maps.StreetViewService;
import StreetViewPanorama = google.maps.StreetViewPanorama;
import StreetViewPanoramaData = google.maps.StreetViewPanoramaData;
import StreetViewStatus = google.maps.StreetViewStatus;
import { AuthService } from './../../../auth/services/auth.service';
import { User } from './../../../../_entities/User';
import { Permiso } from 'src/app/_entities/enums/permiso.enum';
import { ThrowStmt } from '@angular/compiler';
import { FormGenerico } from '../../../../_entities/FormGenerico';
import { LocalComercial } from 'src/app/_entities/local-comercial/local-comercial';
import { DatePipe } from '@angular/common';
import { Capturista } from 'src/app/_entities/tablero/capturista';
import { AlumbradoPotencias } from 'src/app/_entities/alumbrado/alumbradoPotencias';
import { TableroService } from 'src/app/pages/dashboard/services/tablero.service';
import { CountryInfo } from '../../service/app.service';
import { ServiceGrafica } from './app.service';

var currentInfoWindow = null;
let map: google.maps.Map;

let loader = new Loader({
  apiKey: 'AIzaSyDuJ3IBZIs2mRbR4alTg7OZIsk0sXEJHhg',
});

@Component({
  selector: 'app-detalle-alumbrado',
  templateUrl: './detalle-alumbrado.component.html',
  styleUrls: ['./detalle-alumbrado.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [ServiceGrafica]
})
export class DetalleAlumbradoComponent implements OnInit {
  @ViewChild('myImage', { static: true }) image: ElementRef;

  customMarkerUrl: string;
  mapMarkerUrl: string;

  countriesInfo: CountryInfo[];

  public information: string = 'information';
  public titulo: string = 'Sistema de Alumbrado Público';
  public datosDiarios: number = 1.340;
  public datosSemanal: number = 1.953;
  public datosMensual: number = 13.400;
  public Cliente: string = 'Roberto Flores';

  public datosGrafica;

  public listaLocales: LocalComercial[];
  public listaPotencias: AlumbradoPotencias[];
  public datosReporte = [];
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = true;
  public mensajeModulo: string = 'Locales Comerciales';
  public mensajeAgrupar: string =
    'Arrastre un encabezado de columna aquí para agrupara por esa columna';
  public isDisabled: boolean = true;

  public permisoLocales: string;
  public permisoAltaLocales: string;
  public permisoActualizarLocales: string;
  public permisoEliminarLocales: string;
  public permisoBajaLocal: string;
  public permisoVisualizarDetalle: string;
  public listaCapturista: Capturista[];
  

  @Input() value: string;
  @Input() label: string;
  @Input() background: string;
  @Input() color: string;

  @Input() icon: string;

  public fechaInicio;
  public fechaFinal;
  public loadingMessage: string = 'Cargando...';
  public showTable: boolean = false;
  public detalle: User;
	public interval = null;

 
  private _gap = 16;
  gap = `${this._gap}px`;
  col2 = `1 1 calc(50% - ${this._gap / 2}px)`;
  col3 = `1 1 calc(33.3333% - ${this._gap / 1.5}px)`;
  public panorama: StreetViewPanorama;
  public sv: StreetViewService;
  public isStreetView: boolean = true;
  public isAvailable: boolean = true;
  public isAvailableIMG: boolean = true;
  public ocultaBtns:boolean = false;
  public showRazonSocialPC: boolean = false;
  public showRazonSocial: boolean = false;
  public showRFCPC: boolean = false;
  public showImage: boolean = false;
  public datos: DetalleLocal;

  public mensaje: string = 'Hola';
  public imagenCarrusel;
  public loading: boolean = false;
  public informacion: DetalleLocal;
  public imei: string;
  public id: number;
  public galeria: any;
  public nombre: string = 'Dato';
  public i: number = 0;

  public permisoEstatusFaltante: string;
  public permisoEstatusRevision: string;
  public permisoEstatusRechazo: string;
  public permisoEstatusCorrecto: string;

  public permisoVisualizarDetalleLuminaria: string;

  public coloniaRegistros: FormGenerico[];
  public coloniaRegistrosSapac: FormGenerico[];
  public calleRegistros: FormGenerico[];
  public calleRegistrosSapac: FormGenerico[];
  public localidadRegistros: FormGenerico[];
  public localidadRegistrosSapac : FormGenerico[];

  public coloniaNombreComercial;
  public coloniaSapac;
  public calleNombreComercial;
  public calleSapac;
  public localidadNombreComercial;
  public localidadSapac;

  public imgValidate;

  public idColoniaLicenciaComercial;
  public idColoniaSapac;
  public idLocalidadLicenciaComercial;
  public idLocalidadSapac;
  public idCalleLicenciaComercial;
  public idCalleSapac;
  public idMunicipio;
  public addCalleLicencia: boolean = false;
  public nombreComercial;
  public direccionNombreEntidadFederativa;

  
  public showRepresentanteNombre: boolean = false;
  public showRepresentanteApellidoPaterno: boolean = false;
  public showRepresentanteApellidoMaterno: boolean = false;
  public showRepresentanteTelefono: boolean = false;
  public showRepresentantCorreo: boolean = false;

  loadIndicatorVisible = false;
  buttonText = 'Send';
  isLoading: boolean;


  constructor(
    public router: Router,
    public AuthService: AuthService,
    private tableroService: TableroService,
    public localComercialService: LocalComercialService,
    public activatedRoute: ActivatedRoute,
    private datepipe: DatePipe,
    serviceGrafica: ServiceGrafica,
  ) // public datePipe: DatePipe,
  // public dialog: MatDialog,
  // public dialogRef: MatDialogRef<DetalleLocal>,
  //  @Inject(MAT_DIALOG_DATA) public data: DetalleLocal
  {
    this.countriesInfo = serviceGrafica.getCountriesInfo();
   }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit() {
    this.obtenerGraficaMes();
    this.obtenerPermisos();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.obtenerDetalleLocal(this.id);
    });
    this.obtenerListaAlumbrado();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  public get Permiso() {
    return Permiso;
  }

  public obtenerPermisos() {
    // this.permisoEstatusFaltante = Permiso.EstatusInformaciónFaltante;
    // this.permisoEstatusRevision = Permiso.EstatusRevision;
    // this.permisoEstatusRechazo = Permiso.EstatusRechazo;
    // this.permisoEstatusCorrecto = Permiso.EstatusDatosCorrectos;

    this.permisoVisualizarDetalleLuminaria = Permiso.VisualizarDetalleLuminarias;

  }

  public imagenLicencia;
  public imagenReciboPredial;
  public imagenReciboSapac;
  public imagenCaratulaMedidor;
  public imagenFachadaEstablecimiento;
  public imagenEstacionamiento;
  public imagenBodega;
  public imagenVistoBueno;
  public typePeople;
  public typeEmpresa;
  public typePrograma;
  public typeEstacionamiento;

  obtenerDetalleLocal(id) {
    this.loading = true;
    this.localComercialService.obtenerDetalleLocalComercial(id).subscribe(
      (res) => {
        this.informacion = res;
        loader.load().then(() => {
          const iconBase = "http://gtmtec.mx/Licenciamiento/licencias/assets/dist/img/";
          // const { lat, lng } = this.informacion;
          
          const coordinates = { lat:18.92640760321088, lng:-99.22391387990344 };
          this.sv = new google.maps.StreetViewService();
          this.panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'));
          this.sv.getPanorama({
            location: coordinates,
            radius: 50
          }, (data, status) => {
            this.processSVData(data, status);
            this.panorama.setVisible(true);
            this.isStreetView = false;
          });
          map = new google.maps.Map(document.getElementById("map"), {
            center: coordinates,
            zoom: 16,
            gestureHandling: "greedy"
          });
          
          if(this.informacion.fotos.length === 0){
            this.isAvailableIMG = false;
            this.ocultaBtns = true;
          }
          
          const marker = new google.maps.Marker({
            position: coordinates,
            map,
            icon: iconBase + this.informacion.nombreEstatus + ".png"
          });

          var contentString="<div style='float:left'><img id="+ '"imgen"' +"src='http://www.gtmtec.mx/FotosLicenciamiento\\" + id + "\\LicenciaFuncionamiento.jpeg'"
          // + "https://es.wikipedia.org/wiki/Imagen#/media/Archivo:Image_created_with_a_mobile_phone.png"
          + "' width='100' height='100' ></div><div style='float:right; padding: 10px;'><i class='fas fa-user-lock'></i>&nbsp;&nbsp;<b style='color:#d5238b; font-weight: 900;'>Nombre:</b><br>" + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + this.informacion.nombreComercial + "</br><br><i class='fas fa-store'></i>&nbsp;&nbsp;<b style='color:#d5238b; font-weight: 900;'>Giro:</b>&nbsp;&nbsp;<br>" + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + this.informacion.nombreGiro + "</div>"

          const infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          google.maps.event.addListener(marker, 'click', function () {
            if (currentInfoWindow != null) {
              currentInfoWindow.close();
            }
            infowindow.open(map, marker);
            currentInfoWindow = infowindow;
        
          });
          google.maps.event.addListener(map, 'click', function () {
            infowindow.close();
          });

          google.maps.event.addListener(infowindow, 'domready', () => {
            const rutaimg = "http://www.gtmtec.mx/FotosLicenciamiento\\" + id + "\\LicenciaFuncionamiento.jpeg"
            var obj = new Image();
            obj.src = "http://www.gtmtec.mx/FotosLicenciamiento\\" + id + "\\LicenciaFuncionamiento.jpeg";
            if (obj.complete) {
            } else {
              (document.getElementById('imgen') as HTMLImageElement).src = 'https://gtmsion.s3.amazonaws.com/Veh%C3%ADculos/default.png';
            }
          });

        })

        this.nombreComercial = this.informacion.nombreComercial;
        this.direccionNombreEntidadFederativa = this.informacion.direccion.nombreEntidadFederativaLicencia
        
        this.loading = true;
   
        if(this.imagenLicencia = this.informacion.fotos.find(
          (x) => x.idTipoFoto == 1)){
            this.imgValidate = this.imagenLicencia.ruta;
          }else{
            this.imgValidate = 'https://gtmsion.s3.amazonaws.com/Veh%C3%ADculos/default.png'
            // this.imgValidate = this.imagenLicencia;
          }
        
        this.imagenReciboPredial = this.informacion.fotos.find(
          (x) => x.idTipoFoto == 2
        );
        this.imagenReciboSapac = this.informacion.fotos.find(
          (x) => x.idTipoFoto == 3
        );
        this.imagenCaratulaMedidor = this.informacion.fotos.find(
          (x) => x.idTipoFoto == 4
        );
        this.imagenFachadaEstablecimiento = this.informacion.fotos.find(
          (x) => x.idTipoFoto == 5
        );
        this.imagenEstacionamiento = this.informacion.fotos.find(
          (x) => x.idTipoFoto == 6
        );
        this.imagenBodega = this.informacion.fotos.find(
          (x) => x.idTipoFoto == 7
        );
        this.imagenVistoBueno = this.informacion.fotos.find(
          (x) => x.idTipoFoto == 8
        );
        this.imagenCarrusel = this.informacion.fotos[this.i].ruta;
        finalize(() => {
          this.loading = false;
        });
        this.loading = true;

        if (this.informacion.tipoPersona === 1) {
          this.typePeople = "Física"
          this.showRazonSocial = true;
          this.showRepresentanteNombre = true;
          this.showRepresentanteApellidoPaterno = true;
          this.showRepresentanteApellidoMaterno = true;
          this.showRepresentantCorreo = true;
          this.showRepresentanteTelefono = true;
        } else{this.typePeople = "Moral";}
          

        if (this.informacion.proteccionCivil.esEmpresa === false) {
          this.typeEmpresa = "No";
          this.showRazonSocialPC = true;
          this.showRFCPC = true;
        } else
          this.typeEmpresa = "Sí";

        if (this.informacion.proteccionCivil.tienePrograma === true) {
          this.typePrograma = "Sí";
        } else
          this.typePrograma = "No";
        if (this.informacion.estacionamiento === true) {
          this.typeEstacionamiento = "Sí";
        } else
          this.typeEstacionamiento = "No";

        this.obtenerCallesLicencia(this.informacion.direccion.idColoniaLicencia);
        this.obtenerCallesLicenciaSapac(this.informacion.direccionSapac.idColoniaSapac);
        this.obtenerColoniasLicencia(this.informacion.direccion.idLocalidadLicencia);
        this.obtenerColoniasLicenciaSapac(this.informacion.direccionSapac.idLocalidadSapac);
        this.obtenerLocalidades(this.informacion.direccion.idMunicipioLicencia);
        this.obtenerLocalidadesSapac(this.informacion.direccionSapac.idMunicipioSapac);
        this.idMunicipio = (this.informacion.direccion.idMunicipioLicencia);
       
        this.idColoniaLicenciaComercial = (this.informacion.direccion.idColoniaLicencia);
        this.idColoniaSapac = (this.informacion.direccionSapac.idColoniaSapac);
        
        this.idCalleLicenciaComercial = (this.informacion.direccion.idCalleLicencia);
        this.idCalleSapac = (this.informacion.direccionSapac.idCalleSapac);

        this.idLocalidadLicenciaComercial = (this.informacion.direccion.idLocalidadLicencia);
        this.idLocalidadSapac= (this.informacion.direccionSapac.idLocalidadSapac);

      },
      (err) => {
        console.log(err);
      }
    );

  }

  obtenerLocalidades(idMunicipio) {
    this.localComercialService.obtenerLocalidadesMunicipio(idMunicipio).subscribe(
      (res: FormGenerico[]) => {
        res.push({ id: 0, nombre: 'Otro' });
        this.localidadRegistros = res.map((x) => {
          return { id: x.id, nombre: x.nombre };
        });
        const tempLocalidad = this.localidadRegistros.find(y => y.id === this.idLocalidadLicenciaComercial);
        this.localidadNombreComercial = tempLocalidad.nombre;
      }
    );
  }

  obtenerPotencias() {
      this.localComercialService.obtenerListaLocalComercial().subscribe(
        (response) => {
          this.listaPotencias = response;
          response.forEach(listaLocales => {
            //  this.datosReporte.push({
            //   'RFC': listaLocales.rfc,
            //   'Nombre Comercial': listaLocales.nombreComercial,
            //   'Giro': listaLocales.giro,
            //   'Capturista': listaLocales.nombreCapturista,
            //   'Estatus': listaLocales.nombreEstatus,
            //   'Fecha Expedicion': this.datepipe.transform(listaLocales.fechaHora, 'yyyy-MM-dd - HH:mm:ss'),
            //  });
           });
  
          if(this.datosReporte.length){
            this.isDisabled = false;
          }
  
        }, (error) => {
      })
    }

  obtenerLocalidadesSapac(idMunicipio) {
    this.localComercialService.obtenerLocalidadesMunicipio(idMunicipio).subscribe(
      (res: FormGenerico[]) => {
        res.push({ id: 0, nombre: 'Otro' });
        this.localidadRegistrosSapac = res.map((x) => {
          return { id: x.id, nombre: x.nombre };
        });
        const tempLocalidadSapac = this.localidadRegistrosSapac.find(y => y.id === this.idLocalidadSapac);
        this.localidadSapac = tempLocalidadSapac.nombre;
      }
    );
  }

  obtenerCallesLicencia(idColonia) {
    this.localComercialService.obtenerCallesColonia(idColonia).subscribe((res: FormGenerico[]) => {
      res.push({ id: 0, nombre: 'Otro' })
      this.calleRegistros = res.map(x => { return { id: x.id, nombre: x.nombre } });
      const tempCalle = this.calleRegistros.find(y => y.id === this.idCalleLicenciaComercial);
      this.calleNombreComercial = tempCalle.nombre;
    });
  }

  obtenerCallesLicenciaSapac(idColonia) {
    this.localComercialService.obtenerCallesColonia(idColonia).subscribe((res: FormGenerico[]) => {
      res.push({ id: 0, nombre: 'Otro' })
      this.calleRegistrosSapac = res.map(x => { return { id: x.id, nombre: x.nombre } });
      const tempCalleSapac = this.calleRegistrosSapac.find(y => y.id === this.idCalleSapac);
      this.calleSapac = tempCalleSapac.nombre;
    });
  }

  obtenerColoniasLicencia(idLocalidad) {
    this.localComercialService.obtenerColoniasLocalidad(idLocalidad).
    subscribe(
      (res: FormGenerico[]) => {
        res.push({ id: 0, nombre: 'Otro' });
        this.coloniaRegistros = res.map((x) => {
          return { id: x.id, nombre: x.nombre };
        });
        const tempColonia = this.coloniaRegistros.find(y => y.id === this.idColoniaLicenciaComercial);
        this.coloniaNombreComercial = tempColonia.nombre;
      }
    );
  }

  obtenerColoniasLicenciaSapac(idLocalidad) {
    this.localComercialService.obtenerColoniasLocalidad(idLocalidad).
    subscribe(
      (res: FormGenerico[]) => {
        res.push({ id: 0, nombre: 'Otro' });
        this.coloniaRegistrosSapac = res.map((x) => {
          return { id: x.id, nombre: x.nombre };
        });
        const tempColoniaSapac = this.coloniaRegistrosSapac.find(y => y.id === this.idColoniaSapac);
        this.coloniaSapac = tempColoniaSapac.nombre;
      }
    );
  }

  processSVData(data, status): void {
    if (data != null) {
      this.panorama.setPano(data.location.pano);
      this.panorama.setPov({
        heading: 270,
        pitch: 0
      });
    } else {
      this.isAvailable = false;
    }
  }

  prev() {
    if (this.i <= 0) this.i = this.informacion.fotos.length;
    this.i--;
    this.loading = true;
    return (this.imagenCarrusel = this.informacion.fotos[this.i].ruta);
  }

  next() {
    if (this.i >= this.informacion.fotos.length - 1) this.i = -1;
    this.i++;
    this.loading = true;
    return (this.imagenCarrusel = this.informacion.fotos[this.i].ruta);
  }

  cambiarEstatus(nombreEstatus) {
    this.localComercialService.cambiarEstatus(this.id, nombreEstatus).subscribe(
      (response) => {
        this.obtenerDetalleLocal(this.id);
        Swal.fire({
          title: '¡Correcto!',
          text: `¡Se ha cambiado correctamente el Estatus!`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error) => {
        Swal.fire('Ops!', 'Error al intentar modificar el estatus', 'error');
      }
    );
  }

  /*----------------------------------------
	Obtener información para grafica mes
----------------------------------------*/
obtenerGraficaMes() {
  this.tableroService.obtenerDatosMes().subscribe(
    (response) => {
      this.datosGrafica = [
        {
          mes: 'Enero',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "1" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "1" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "1" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "1" && value.estatus == "Revisión" ? sum + value.total : sum), 0)
        }, {
          mes: 'Febrero',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "2" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "2" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "2" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "2" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        }, {
          mes: 'Marzo',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "3" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "3" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "3" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "3" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        }, {
          mes: 'Abril',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "4" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "4" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "4" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "4" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        },
        {
          mes: 'Mayo',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "5" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "5" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "5" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "5" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        },
        {
          mes: 'Junio',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "6" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "6" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "6" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "6" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        },
        {
          mes: 'Julio',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "7" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "7" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "7" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "7" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        },
        {
          mes: 'Agosto',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "8" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "8" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "8" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "8" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        },
        {
          mes: 'Septiembre',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "9" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "9" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "9" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "9" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        },
        {
          mes: 'Octubre',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "10" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "10" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "10" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "10" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        },
        {
          mes: 'Noviembre',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "11" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "11" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "11" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "11" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        },
        {
          mes: 'Diciembre',
          statusfaltante: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "12" && value.estatus == "Información Faltante" ? sum + value.total : sum), 0),
          statusrechazado: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "12" && value.estatus == "Rechazo o Sin respuesta" ? sum + value.total : sum), 0),
          statuscorrecto: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "12" && value.estatus == "Datos Correctos" ? sum + value.total : sum), 0),
          statusrevision: response.lista.reduce((sum, value) => (typeof value.total == "number" && value.mes == "12" && value.estatus == "Revisión" ? sum + value.total : sum), 0),
        }
      ]
    }
  )
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

      loader.load().then(() => {
        const coordinates = { lat:18.92640760321088, lng:-99.22391387990344 };
        this.sv = new google.maps.StreetViewService();
        this.panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'));
        this.sv.getPanorama({
          location: coordinates,
          radius: 50
        }, (data, status) => {
          this.processSVData(data, status);
          this.panorama.setVisible(true);
          this.isStreetView = false;
        });
        map = new google.maps.Map(document.getElementById("map"), {
          center: coordinates,
          zoom: 16,
          gestureHandling: "greedy"
        });
        const marker = new google.maps.Marker({
          position: coordinates,
          map,
          // icon: iconBase + this.informacion.nombreEstatus + ".png"
        });
      })
      
      
    }

  regresar() {
    this.router.navigateByUrl('/alumbrado/lista-alumbrado');
  }
  
}
