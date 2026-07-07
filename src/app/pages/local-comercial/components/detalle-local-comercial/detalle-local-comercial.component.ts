import { fadeOutAnimation, routeAnimation } from 'src/@fury/animations/route.animation';
import { scaleInAnimation } from './../../../../../@fury/animations/scale-in.animation';
import { fadeInRightAnimation } from './../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from './../../../../../@fury/animations/fade-in-up.animation';
import { galeriaMetaAnimation, galeriaPhotoAnimation } from '../../animations/detalle-galeria.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalComercialService } from './../../services/local-comercial.service';
import { Component, OnInit, inject, ElementRef, ViewChild, enableProdMode, Inject, } from '@angular/core';
import { DetalleLocal, direccion, direccionSapac, contacto, representante, proteccionCivil } from './../../../../_entities/local-comercial/detalle-local-comercial';
// import { DatePipe } from '@angular/common';
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

var currentInfoWindow = null;
let map: google.maps.Map;

let loader = new Loader({
  apiKey: 'AIzaSyDuJ3IBZIs2mRbR4alTg7OZIsk0sXEJHhg',
});

const MARKER_ASPECT_RATIO = 739 / 1067;
const MARKER_DISPLAY_HEIGHT = 54;
const MARKER_DISPLAY_WIDTH = Math.round(MARKER_DISPLAY_HEIGHT * MARKER_ASPECT_RATIO);

const MARKER_ICONS: Record<string, string> = {
  'Datos Correctos': 'assets/images/logos/marker_success.png',
  Correcto: 'assets/images/logos/marker_success.png',
  'Revisión': 'assets/images/logos/marker_primary.png',
  Revision: 'assets/images/logos/marker_primary.png',
  'Información Faltante': 'assets/images/logos/marker_warning.png',
  InformacionFaltante: 'assets/images/logos/marker_warning.png',
  Rechazo: 'assets/images/logos/marker_danger.png',
  'Rechazo o Sin respuesta': 'assets/images/logos/marker_danger.png',
};

const MAP_STYLES_SIN_ESTABLECIMIENTOS: google.maps.MapTypeStyle[] = [
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.medical', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.school', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.place_of_worship', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.sports_complex', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.attraction', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.government', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
];

const ICON_GIRO =
  '<svg class="mon-veh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>';
const ICON_USER =
  '<svg class="mon-veh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>';

@Component({
  selector: 'app-detalle-local-comercial',
  templateUrl: './detalle-local-comercial.component.html',
  styleUrls: ['./detalle-local-comercial.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation, fadeOutAnimation, scaleInAnimation, galeriaPhotoAnimation, galeriaMetaAnimation]
})
export class DetalleLocalComercialComponent implements OnInit {
  @ViewChild('myImage', { static: true }) image: ElementRef;
  customMarkerUrl: string;
  mapMarkerUrl: string;


  public detalle: User;
  private _gap = 16;
  gap = `${this._gap}px`;
  col2 = `1 1 calc(50% - ${this._gap / 2}px)`;
  col3 = `1 1 calc(33.3333% - ${this._gap / 1.5}px)`;
  public panorama: StreetViewPanorama;
  public sv: StreetViewService;
  public isStreetView: boolean = true;
  public titulo: string = 'Licenciamiento';
  public isAvailable: boolean = true;
  public isAvailableIMG: boolean = true;
  public ocultaBtns:boolean = false;
  public showImage: boolean = false;
  public datos: DetalleLocal;
  public mensajeModulo: string = 'Detalle Local Comercial';
  public datosCargados = false;
  public tieneUbicacionMapa = false;
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public mensajeAgrupar: string = 'Arrastre un encabezado de columna aquí para agrupara por esa columna';
  public isDisabled: boolean = true;
  public imagenCarrusel = 'assets/default.png';
  public loading: boolean = false;
  public informacion: DetalleLocal;
  public imei: string;
  public id: number;
  public galeria: any;
  public nombre: string = 'Dato';
  public i: number = 0;
  public galeriaDireccion: 'init' | 'next' | 'prev' = 'init';
  public interval = null;
  public loadingMessage: string = 'Cargando...';
	loadingVisible = false;

  public permisoEstatusFaltante: string;
  public permisoEstatusRevision: string;
  public permisoEstatusRechazo: string;
  public permisoEstatusCorrecto: string;

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
  public imgValidate = 'assets/default.png';
  public readonly defaultImage = 'assets/default.png';

  resolveFotoRuta(ruta: string | null | undefined): string {
    if (!ruta || !ruta.trim()) {
      return this.defaultImage;
    }

    const normalized = decodeURIComponent(ruta).toLowerCase();

    if (normalized.includes('default.png')) {
      return this.defaultImage;
    }

    return ruta;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }

  private crearInformacionVacia(): DetalleLocal {
    return {
      direccion: {} as direccion,
      direccionSapac: {} as direccionSapac,
      contacto: {} as contacto,
      representante: {} as representante,
      proteccionCivil: { esEmpresa: false, tienePrograma: false } as proteccionCivil,
      fotos: [],
      NombreProteccionCivil: null,
      ApellidoPaternoProteccionCivil: null,
      ApellidoMaternoProteccionCivil: null,
      TelefonoProteccionCivil: null,
      RegistroAcreditacion: null,
      TienePrograma: false,
      VistoBueno: null,
    } as DetalleLocal;
  }

  private normalizarInformacion(res: Partial<DetalleLocal> | null | undefined): DetalleLocal {
    const base = this.crearInformacionVacia();
    if (!res) {
      return base;
    }
    return {
      ...base,
      ...res,
      direccion: { ...base.direccion, ...(res.direccion || {}) },
      direccionSapac: { ...base.direccionSapac, ...(res.direccionSapac || {}) },
      contacto: { ...base.contacto, ...(res.contacto || {}) },
      representante: { ...base.representante, ...(res.representante || {}) },
      proteccionCivil: { ...base.proteccionCivil, ...(res.proteccionCivil || {}) },
      fotos: Array.isArray(res.fotos) ? res.fotos : [],
    };
  }

  private mostrarCargandoDetalle(): void {
    if (Swal.isVisible()) {
      return;
    }
    Swal.fire({
      title: 'Cargando...',
      html: 'Obteniendo detalle del local comercial',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      backdrop: 'rgba(19, 41, 61, 0.65)',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  private ocultarCargandoDetalle(conRetraso = false): void {
    if (!Swal.isVisible()) {
      return;
    }
    if (conRetraso) {
      setTimeout(() => Swal.close(), 500);
      return;
    }
    Swal.close();
  }

  private tieneCoordenadasValidas(lat: unknown, lng: unknown): boolean {
    const latNum = Number(lat);
    const lngNum = Number(lng);
    return Number.isFinite(latNum) && Number.isFinite(lngNum) && latNum !== 0 && lngNum !== 0;
  }

  private todasLasFotosSonPlaceholder(): boolean {
    if (!this.informacion?.fotos?.length) {
      return true;
    }

    return this.informacion.fotos.every(
      (foto) => this.resolveFotoRuta(foto.ruta) === this.defaultImage
    );
  }

  private formatInfoWindowValue(value: string | null | undefined): string {
    if (
      value == null ||
      value === undefined ||
      String(value).trim() === '' ||
      String(value).toLowerCase() === 'null'
    ) {
      return 'Sin Información';
    }

    return String(value).trim();
  }

  tieneValor(valor: unknown): boolean {
    if (valor === null || valor === undefined) {
      return false;
    }
    const texto = String(valor).trim();
    return texto !== '' && texto.toLowerCase() !== 'null';
  }

  normalizarTipoPersona(valor: unknown): 1 | 2 | null {
    if (!this.tieneValor(valor)) {
      return null;
    }
    const tipo = Number(valor);
    if (tipo === 1) {
      return 1;
    }
    if (tipo === 2) {
      return 2;
    }
    return null;
  }

  concatenarNombre(...partes: unknown[]): string {
    return partes
      .filter((parte) => this.tieneValor(parte))
      .map((parte) => String(parte).trim())
      .join(' ');
  }

  formatearMetrosCuadrados(valor: unknown): string {
    if (!this.tieneValor(valor)) {
      return '';
    }
    const numero = Number(valor);
    if (Number.isFinite(numero)) {
      return `${numero} m²`;
    }
    const texto = String(valor).trim();
    return /m²|m2/i.test(texto) ? texto : `${texto} m²`;
  }

  formatearSuperficie(valor: unknown): string {
    if (!this.tieneValor(valor)) {
      return '';
    }
    const texto = String(valor).trim();
    if (/m²|m2|metros/i.test(texto)) {
      return texto;
    }
    const numero = Number(texto);
    if (Number.isFinite(numero)) {
      return `${numero} m²`;
    }
    return texto;
  }

  formatearCodigoPostal(valor: unknown): string {
    if (!this.tieneValor(valor)) {
      return '';
    }
    return `C.P. ${String(valor).trim()}`;
  }

  formatearNumeroExterior(valor: unknown): string {
    if (!this.tieneValor(valor)) {
      return '';
    }
    return `${String(valor).trim()}`;
  }

  formatearNumeroInterior(valor: unknown): string {
    if (!this.tieneValor(valor)) {
      return '';
    }
    return `${String(valor).trim()}`;
  }

  formatearSiNo(valor: unknown): string {
    if (valor === true) {
      return 'Sí';
    }
    if (valor === false) {
      return 'No';
    }
    return '';
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private campoTieneValor(valor: unknown): boolean {
    return this.formatInfoWindowValue(valor as string) !== 'Sin Información';
  }

  private buildTooltipRow(icon: string, label: string, value: string, raw: unknown): string {
    const vacio = !this.campoTieneValor(raw);
    const valueClass = vacio ? ' mon-veh-tooltip__row-value--vacio' : '';
    return ''
      + '<div class="mon-veh-tooltip__row mon-veh-tooltip__row--wide">'
      + `<span class="mon-veh-tooltip__row-icon" aria-hidden="true">${icon}</span>`
      + '<p class="mon-veh-tooltip__row-copy">'
      + `<span class="mon-veh-tooltip__row-label">${label}</span>`
      + `<span class="mon-veh-tooltip__row-value${valueClass}">${value}</span>`
      + '</p></div>';
  }

  private getMarkerIcon(nombreEstatus: string): google.maps.Icon {
    const url = MARKER_ICONS[nombreEstatus] || 'assets/images/logos/marker_spring.webp';
    return {
      url,
      scaledSize: new google.maps.Size(MARKER_DISPLAY_WIDTH, MARKER_DISPLAY_HEIGHT),
      anchor: new google.maps.Point(MARKER_DISPLAY_WIDTH / 2, MARKER_DISPLAY_HEIGHT),
    };
  }

  private buildInfoWindowContent(imgUrl: string): string {
    const urlImagen = this.escapeHtml(imgUrl.replace(/\\/g, '/'));
    const defaultImg = this.escapeHtml(this.defaultImage);
    const nombre = this.escapeHtml(this.formatInfoWindowValue(this.informacion.nombreComercial));
    const giro = this.escapeHtml(this.formatInfoWindowValue(this.informacion.nombreGiro));

    return ''
      + '<article class="mon-veh-tooltip mon-veh-tooltip--infowindow" role="tooltip" aria-label="Detalle del local comercial">'
      + '<div class="mon-veh-tooltip__glow" aria-hidden="true"></div>'
      + `<div class="mon-veh-tooltip__photo"><img src="${urlImagen}" alt="Licencia" onerror="this.onerror=null;this.src='${defaultImg}'" /></div>`
      + '<div class="mon-veh-tooltip__divider" aria-hidden="true"></div>'
      + '<div class="mon-veh-tooltip__body">'
      + this.buildTooltipRow(ICON_USER, 'Nombre:', nombre, this.informacion.nombreComercial)
      + this.buildTooltipRow(ICON_GIRO, 'Giro:', giro, this.informacion.nombreGiro)
      + '</div>'
      + '</article>';
  }

  private applyInfoWindowShellStyles(): void {
    document.querySelectorAll('.gm-style-iw-c, .gm-style-iw-d').forEach((el) => {
      const node = el as HTMLElement;
      node.style.background = 'transparent';
      node.style.boxShadow = 'none';
      node.style.overflow = 'visible';
      node.style.padding = '0';
    });

    const iw = document.querySelector('.gm-style-iw') as HTMLElement | null;
    if (iw) {
      iw.style.maxWidth = 'none';
    }
  }

  private setupInfoWindowImageFallback(imgUrl: string): void {
    const img = document.querySelector(
      '.mon-veh-tooltip--infowindow .mon-veh-tooltip__photo img'
    ) as HTMLImageElement | null;
    if (!img) {
      return;
    }

    img.onerror = () => {
      img.src = this.defaultImage;
    };

    const probe = new Image();
    probe.onerror = () => {
      img.src = this.defaultImage;
    };
    probe.src = imgUrl;
  }

  private setupInfoWindowHoverPersistence(
    onLeave: () => void,
    onEnter: () => void
  ): void {
    const root = document.querySelector('.mon-veh-tooltip--infowindow');
    if (!root) {
      return;
    }

    root.addEventListener('mouseenter', onEnter);
    root.addEventListener('mouseleave', onLeave);
  }

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

  public mostrarContenido: boolean = false;
  public showRazonSocialPC: boolean = false;
  public showRazonSocial: boolean = false;
  public showRFCPC: boolean = false;
  public showRepresentanteNombre: boolean = false;
  public showRepresentanteApellidoPaterno: boolean = false;
  public showRepresentanteApellidoMaterno: boolean = false;
  public showRepresentanteTelefono: boolean = false;
  public showRepresentantCorreo: boolean = false;
  

  icon = true;
  buttonText = 'Información Faltante';
  loadIndicatorVisible = false;

  iconSecond = true;
  buttonTextSecond = 'Revisión';
  loadIndicatorVisibleSecond = false;

  iconThird = true;
  buttonTextThird = 'Rechazo'
  loadIndicatorVisibleThird = false;

  iconFourth = true;
  buttonTextFourth = 'Datos Correctos'
  loadIndicatorVisibleFourth = false;
  
  iconFifth = true;
  buttonTextFifth = 'Cancelar';
  loadIndicatorVisibleFifth = false;

  constructor(
    public router: Router,
    public AuthService: AuthService,
    public localComercialService: LocalComercialService,
    public activatedRoute: ActivatedRoute) {
      this.showFilterRow = true;
		  this.showHeaderFilter = true;
      this.informacion = this.crearInformacionVacia();
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.datosCargados = false;
      this.obtenerDetalleLocal(this.id, true);
    });
  }

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 2000);
  }

  ngAfterContentInit() {
		this.interval = setInterval(async () => {
			this.obtenerDetalleLocal(this.id, false);
		}, 180000);
	}

  ngOnDestroy() {
		clearInterval(this.interval);
	}

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

/*-------------------------------
	Obtener Permisos Asignados
-------------------------------*/
  public get Permiso() {
    return Permiso;
  }

  public obtenerPermisos() {
    this.permisoEstatusFaltante = Permiso.EstatusInformaciónFaltante;
    this.permisoEstatusRevision = Permiso.EstatusRevision;
    this.permisoEstatusRechazo = Permiso.EstatusRechazo;
    this.permisoEstatusCorrecto = Permiso.EstatusDatosCorrectos;
  }

/*------------------------------------
	Obtención de información para todo
  el detalle por id
------------------------------------*/
  public imagenLicencia;
  public imagenReciboPredial;
  public imagenReciboSapac;
  public imagenCaratulaMedidor;
  public imagenCuadroMedidor;
  public imagenFachadaEstablecimiento;
  public imagenEstacionamiento;
  public imagenBodega;
  public imagenVistoBueno;
  public typePeople;
  public tipoPersonaTexto = '';
  public tieneTipoPersona = false;
  public nombreSapacCompleto = '';
  public nombrePropietarioCompleto = '';
  public nombreContactoCompleto = '';
  public nombreRepresentanteCompleto = '';
  public nombreProteccionCivilCompleto = '';
  public typeEmpresa;
  public typePrograma;
  public typeEstacionamiento;

  obtenerDetalleLocal(id: number, mostrarCargando = true) {
    if (mostrarCargando) {
      this.mostrarCargandoDetalle();
    }
    this.localComercialService.obtenerDetalleLocalComercial(id).subscribe(
      (res) => {
        this.informacion = this.normalizarInformacion(res);
        this.nombreComercial = this.informacion.nombreComercial ?? '';
        this.direccionNombreEntidadFederativa =
          this.informacion.direccion?.nombreEntidadFederativaLicencia ?? null;

        this.aplicarDetalleLocal();
        this.tieneUbicacionMapa = this.tieneCoordenadasValidas(
          this.informacion.lat,
          this.informacion.lng
        );

        this.datosCargados = true;
        this.ocultarCargandoDetalle(true);

        if (this.tieneUbicacionMapa) {
          setTimeout(() => this.inicializarMapaDetalle(id), 0);
        } else {
          this.isAvailable = false;
        }
      },
      (err) => {
        console.log(err);
        this.ocultarCargandoDetalle(false);
        Swal.fire({
          backdrop: 'rgba(19,41,61)',
          title: 'Error',
          text: 'No se pudo obtener el detalle del local comercial.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
          allowOutsideClick: false,
        }).then(() => {
          this.router.navigateByUrl('/local-comercial/lista-local-comercial');
        });
      }
    );
  }

  private aplicarDetalleLocal(): void {
    this.loading = true;

    const fotos = this.informacion.fotos ?? [];
    if (fotos.length > 0) {
      this.imagenLicencia = fotos.find((x) => x.idTipoFoto == 1);
      if (this.imagenLicencia) {
        this.imgValidate = this.resolveFotoRuta(this.imagenLicencia.ruta);
      } else {
        this.imgValidate = this.defaultImage;
      }

      this.imagenReciboPredial = fotos.find((x) => x.idTipoFoto == 2);
      this.imagenReciboSapac = fotos.find((x) => x.idTipoFoto == 3);
      this.imagenCaratulaMedidor = fotos.find((x) => x.idTipoFoto == 4);
      this.imagenCuadroMedidor = fotos.find((x) => x.idTipoFoto == 5);
      this.imagenFachadaEstablecimiento = fotos.find((x) => x.idTipoFoto == 6);
      this.imagenEstacionamiento = fotos.find((x) => x.idTipoFoto == 7);
      this.imagenBodega = fotos.find((x) => x.idTipoFoto == 8);
      this.imagenVistoBueno = fotos.find((x) => x.idTipoFoto == 9);
      this.galeriaDireccion = 'init';
      this.actualizarImagenCarrusel();
      this.ocultaBtns = this.todasLasFotosSonPlaceholder();
      this.loading = false;
    } else {
      this.isAvailableIMG = true;
      this.imgValidate = this.defaultImage;
      this.imagenCarrusel = this.defaultImage;
      this.ocultaBtns = true;
      this.loading = false;
    }

    this.nombreSapacCompleto = this.concatenarNombre(
      this.informacion.nombreSapac,
      this.informacion.apellidoPaternoSapac,
      this.informacion.apellidoMaternoSapac
    );
    this.nombrePropietarioCompleto = this.concatenarNombre(
      this.informacion.nombre,
      this.informacion.apellidoPaterno,
      this.informacion.apellidoMaterno
    );
    this.nombreContactoCompleto = this.concatenarNombre(
      this.informacion.contacto?.contactoNombre,
      this.informacion.contacto?.contactoPaterno,
      this.informacion.contacto?.contactoMaterno
    );
    this.nombreRepresentanteCompleto = this.concatenarNombre(
      this.informacion.representante?.representanteLegalNombre,
      this.informacion.representante?.representanteLegalPaterno,
      this.informacion.representante?.representanteLegalMaterno
    );
    this.nombreProteccionCivilCompleto = this.concatenarNombre(
      this.informacion.proteccionCivil?.nombre,
      this.informacion.proteccionCivil?.apellidoPaterno,
      this.informacion.proteccionCivil?.apellidoMaterno
    );

    const tipoPersona = this.normalizarTipoPersona(this.informacion.tipoPersona);
    this.tieneTipoPersona = tipoPersona !== null;
    this.showRazonSocial = true;
    this.showRepresentanteNombre = true;
    this.showRepresentanteApellidoPaterno = true;
    this.showRepresentanteApellidoMaterno = true;
    this.showRepresentantCorreo = true;
    this.showRepresentanteTelefono = true;
    this.mostrarContenido = true;

    if (tipoPersona === 1) {
      this.typePeople = 'Física';
      this.tipoPersonaTexto = 'Física';
    } else if (tipoPersona === 2) {
      this.typePeople = 'Moral';
      this.tipoPersonaTexto = 'Moral';
      this.showRazonSocial = false;
      this.showRepresentanteNombre = false;
      this.showRepresentanteApellidoPaterno = false;
      this.showRepresentanteApellidoMaterno = false;
      this.showRepresentantCorreo = false;
      this.showRepresentanteTelefono = false;
      this.mostrarContenido = false;
    } else {
      this.typePeople = '';
      this.tipoPersonaTexto = '';
      this.tieneTipoPersona = false;
    }

    const pc = this.informacion.proteccionCivil;
    if (pc?.esEmpresa === false) {
      this.typeEmpresa = 'No';
      this.showRazonSocialPC = true;
      this.showRFCPC = true;
    } else {
      this.typeEmpresa = 'Sí';
    }

    if (pc?.tienePrograma === true) {
      this.typePrograma = 'Sí';
    } else {
      this.typePrograma = 'No';
    }

    if (this.informacion.estacionamiento === true) {
      this.typeEstacionamiento = 'Sí';
    } else {
      this.typeEstacionamiento = 'No';
    }

    const dir = this.informacion.direccion;
    const dirSapac = this.informacion.direccionSapac;

    if (dir?.idColoniaLicencia != null) {
      this.obtenerCallesLicencia(dir.idColoniaLicencia);
    }
    if (dirSapac?.idColoniaSapac != null) {
      this.obtenerCallesLicenciaSapac(dirSapac.idColoniaSapac);
    }
    if (dir?.idLocalidadLicencia != null) {
      this.obtenerColoniasLicencia(dir.idLocalidadLicencia);
    }
    if (dirSapac?.idLocalidadSapac != null) {
      this.obtenerColoniasLicenciaSapac(dirSapac.idLocalidadSapac);
    }
    if (dir?.idMunicipioLicencia != null) {
      this.obtenerLocalidades(dir.idMunicipioLicencia);
    }
    if (dirSapac?.idMunicipioSapac != null) {
      this.obtenerLocalidadesSapac(dirSapac.idMunicipioSapac);
    }

    this.idMunicipio = dir?.idMunicipioLicencia;
    this.idColoniaLicenciaComercial = dir?.idColoniaLicencia;
    this.idColoniaSapac = dirSapac?.idColoniaSapac;
    this.idCalleLicenciaComercial = dir?.idCalleLicencia;
    this.idCalleSapac = dirSapac?.idCalleSapac;
    this.idLocalidadLicenciaComercial = dir?.idLocalidadLicencia;
    this.idLocalidadSapac = dirSapac?.idLocalidadSapac;
  }

  private inicializarMapaDetalle(id: number): void {
    const mapEl = document.getElementById('map');
    const streetEl = document.getElementById('street-view');
    if (!mapEl || !streetEl) {
      return;
    }

    loader.load().then(() => {
      const lat = Number(this.informacion.lat);
      const lng = Number(this.informacion.lng);
      const coordinates = { lat, lng };

      this.sv = new google.maps.StreetViewService();
      this.panorama = new google.maps.StreetViewPanorama(streetEl);
      this.sv.getPanorama(
        { location: coordinates, radius: 50 },
        (data, status) => {
          this.processSVData(data, status);
          this.panorama.setVisible(true);
          this.isStreetView = false;
        }
      );

      map = new google.maps.Map(mapEl, {
        center: coordinates,
        zoom: 16,
        gestureHandling: 'greedy',
        clickableIcons: false,
        styles: MAP_STYLES_SIN_ESTABLECIMIENTOS,
      });

      const marker = new google.maps.Marker({
        position: coordinates,
        map,
        icon: this.getMarkerIcon(this.informacion.nombreEstatus ?? ''),
      });

      const licenciaImgUrl =
        'http://www.gtmtec.mx/FotosLicenciamiento\\' + id + '\\LicenciaFuncionamiento.jpeg';
      const contentString = this.buildInfoWindowContent(licenciaImgUrl);

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 380,
      });

      let closeInfoTimeout: ReturnType<typeof setTimeout> | null = null;

      const openInfoWindow = () => {
        if (closeInfoTimeout) {
          clearTimeout(closeInfoTimeout);
          closeInfoTimeout = null;
        }
        if (currentInfoWindow != null && currentInfoWindow !== infowindow) {
          currentInfoWindow.close();
        }
        infowindow.open({ map, anchor: marker });
        currentInfoWindow = infowindow;
      };

      const cancelCloseInfoWindow = () => {
        if (closeInfoTimeout) {
          clearTimeout(closeInfoTimeout);
          closeInfoTimeout = null;
        }
      };

      const scheduleCloseInfoWindow = () => {
        cancelCloseInfoWindow();
        closeInfoTimeout = setTimeout(() => {
          infowindow.close();
          if (currentInfoWindow === infowindow) {
            currentInfoWindow = null;
          }
          closeInfoTimeout = null;
        }, 250);
      };

      google.maps.event.addListener(marker, 'mouseover', openInfoWindow);
      google.maps.event.addListener(marker, 'click', openInfoWindow);
      google.maps.event.addListener(marker, 'mouseout', scheduleCloseInfoWindow);

      google.maps.event.addListener(map, 'click', () => {
        cancelCloseInfoWindow();
        infowindow.close();
        if (currentInfoWindow === infowindow) {
          currentInfoWindow = null;
        }
      });

      google.maps.event.addListener(infowindow, 'domready', () => {
        this.applyInfoWindowShellStyles();
        this.setupInfoWindowImageFallback(licenciaImgUrl);
        this.setupInfoWindowHoverPersistence(scheduleCloseInfoWindow, cancelCloseInfoWindow);
      });
    });
  }

  obtenerLocalidades(idMunicipio) {
    this.localComercialService.obtenerLocalidadesMunicipio(idMunicipio).subscribe(
      (res: FormGenerico[]) => {
        res.push({ id: 0, nombre: 'Otro' });
        this.localidadRegistros = res.map((x) => {
          return { id: x.id, nombre: x.nombre };
        });
        const tempLocalidad = this.localidadRegistros.find(y => y.id === this.idLocalidadLicenciaComercial);
        this.localidadNombreComercial = tempLocalidad?.nombre ?? null;
      }
    );
  }

  obtenerLocalidadesSapac(idMunicipio) {
    this.localComercialService.obtenerLocalidadesMunicipio(idMunicipio).subscribe(
      (res: FormGenerico[]) => {
        res.push({ id: 0, nombre: 'Otro' });
        this.localidadRegistrosSapac = res.map((x) => {
          return { id: x.id, nombre: x.nombre };
        });
        const tempLocalidadSapac = this.localidadRegistrosSapac.find(y => y.id === this.idLocalidadSapac);
        this.localidadSapac = tempLocalidadSapac?.nombre ?? null;
      }
    );
  }

  obtenerCallesLicencia(idColonia) {
    this.localComercialService.obtenerCallesColonia(idColonia).subscribe((res: FormGenerico[]) => {
      res.push({ id: 0, nombre: 'Otro' })
      this.calleRegistros = res.map(x => { return { id: x.id, nombre: x.nombre } });
      const tempCalle = this.calleRegistros.find(y => y.id === this.idCalleLicenciaComercial);
      this.calleNombreComercial = tempCalle?.nombre ?? null;
    });
  }

  obtenerCallesLicenciaSapac(idColonia) {
    this.localComercialService.obtenerCallesColonia(idColonia).subscribe((res: FormGenerico[]) => {
      res.push({ id: 0, nombre: 'Otro' })
      this.calleRegistrosSapac = res.map(x => { return { id: x.id, nombre: x.nombre } });
      const tempCalleSapac = this.calleRegistrosSapac.find(y => y.id === this.idCalleSapac);
      this.calleSapac = tempCalleSapac?.nombre ?? null;
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
        this.coloniaNombreComercial = tempColonia?.nombre ?? null;
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
        this.coloniaSapac = tempColoniaSapac?.nombre ?? null;
      }
    );
  }

  processSVData(data, status): void {
    if (data != null && this.panorama) {
      this.panorama.setPano(data.location.pano);
      this.panorama.setPov({
        heading: 270,
        pitch: 0
      });
      this.isAvailable = true;
    } else {
      this.isAvailable = false;
    }
  }

  prev() {
    if (!this.informacion?.fotos?.length) {
      return;
    }
    this.galeriaDireccion = 'prev';
    if (this.i <= 0) {
      this.i = this.informacion.fotos.length;
    }
    this.i--;
    this.actualizarImagenCarrusel();
  }

  next() {
    if (!this.informacion?.fotos?.length) {
      return;
    }
    this.galeriaDireccion = 'next';
    if (this.i >= this.informacion.fotos.length - 1) {
      this.i = -1;
    }
    this.i++;
    this.actualizarImagenCarrusel();
  }

  irAFoto(index: number): void {
    if (!this.informacion?.fotos?.length || index === this.i) {
      return;
    }
    this.galeriaDireccion = index > this.i ? 'next' : 'prev';
    this.i = index;
    this.actualizarImagenCarrusel();
  }

  get galeriaSlide(): { url: string; tipo: string; index: number } {
    const foto = this.informacion?.fotos?.[this.i];
    return {
      url: this.imagenCarrusel,
      tipo: this.obtenerTipoFoto(foto),
      index: this.i,
    };
  }

  get tipoFotoActual(): string {
    return this.obtenerTipoFoto(this.informacion?.fotos?.[this.i]);
  }

  trackGaleriaSlide(_index: number, slide: { index: number }): number {
    return slide.index;
  }

  private actualizarImagenCarrusel(): void {
    const foto = this.informacion?.fotos?.[this.i];
    this.imagenCarrusel = this.resolveFotoRuta(foto?.ruta);
    this.loading = false;
  }

  private obtenerTipoFoto(foto?: { tipoFoto?: string; idTipoFoto?: number }): string {
    if (!foto) {
      return 'Sin documento';
    }

    if (foto.tipoFoto?.trim()) {
      return foto.tipoFoto.trim();
    }

    const tipos: Record<number, string> = {
      1: 'Licencia de funcionamiento',
      2: 'Recibo predial',
      3: 'Recibo SAPAC',
      4: 'Carátula medidor',
      5: 'Cuadro medidor',
      6: 'Fachada establecimiento',
      7: 'Estacionamiento',
      8: 'Bodega',
      9: 'Visto Bueno',
    };

    return tipos[foto.idTipoFoto ?? 0] || 'Documento';
  }

  esFotoActualPlaceholder(): boolean {
    const foto = this.informacion?.fotos?.[this.i];
    if (!foto) {
      return true;
    }
    return this.resolveFotoRuta(foto.ruta) === this.defaultImage;
  }

  cambiarEstatus(nombreEstatus) {
    this.buttonText = 'Cargando...';
    this.loadIndicatorVisible = true;
    this.icon = false;
    this.localComercialService.cambiarEstatus(this.id, nombreEstatus).subscribe(
      (response) => {
        this.obtenerDetalleLocal(this.id, false);
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Correcto!',
          html: '¡Se ha cambiado correctamente el Estatus a <b>Información Faltante</b>! ',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error) => {
        this.loadIndicatorVisible = false;
        this.icon = true;
        Swal.fire('Ops!', 'Error al intentar modificar el estatus', 'error');
      }
    );
  }

  cambiarEstatusSecond(nombreEstatus) {
    this.buttonTextSecond = 'Cargando...';
    this.loadIndicatorVisibleSecond = true;
    this.iconSecond = false;
    this.localComercialService.cambiarEstatus(this.id, nombreEstatus).subscribe(
      (response) => {
        this.obtenerDetalleLocal(this.id, false);
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Correcto!',
          html: '¡Se ha cambiado correctamente el Estatus a <b>Revisión</b>! ',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error) => {
        this.loadIndicatorVisibleSecond = false;
        this.iconSecond = true;
        Swal.fire('Ops!', 'Error al intentar modificar el estatus', 'error');
      }
    );
  }

  cambiarEstatusThird(nombreEstatus) {
    this.buttonTextThird = 'Cargando...';
    this.loadIndicatorVisibleThird = true;
    this.iconThird = false;
    this.localComercialService.cambiarEstatus(this.id, nombreEstatus).subscribe(
      (response) => {
        this.obtenerDetalleLocal(this.id, false);
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Correcto!',
          html: '¡Se ha cambiado correctamente el Estatus a <b>Rechazo</b>! ',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error) => {
        this.loadIndicatorVisibleThird = false;
        this.iconThird = true;
        Swal.fire('Ops!', 'Error al intentar modificar el estatus', 'error');
      }
    );
  }

  cambiarEstatusFourth(nombreEstatus) {
    this.buttonTextFourth = 'Cargando...';
    this.loadIndicatorVisibleFourth = true;
    this.iconFourth = false;
    this.localComercialService.cambiarEstatus(this.id, nombreEstatus).subscribe(
      (response) => {
        this.obtenerDetalleLocal(this.id, false);
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Correcto!',
          html: '¡Se ha cambiado correctamente el Estatus a <b>Datos Correctos</b>! ',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error) => {
        this.loadIndicatorVisibleFourth = false;
        this.iconFourth = true;
        Swal.fire('Ops!', 'Error al intentar modificar el estatus', 'error');
      }
    );
  }

/*------------------------------------
	Enrutamiento
------------------------------------*/
  regresar() {
    this.buttonTextFifth = 'Regresar...'
    this.loadIndicatorVisibleFifth = true;
    this.iconFifth = false;
    this.router.navigateByUrl('/local-comercial/lista-local-comercial');
  }

  onClick(data) {
    this.loadIndicatorVisibleFifth = true;
    this.iconFifth = false;
    this.regresar();
    setTimeout(() => {
      this.regresar();
      this.buttonTextFifth = 'Cancelar';
      this.loadIndicatorVisibleFifth = false;
      this.iconFifth = true;
    }, 300);
  }
  
}
