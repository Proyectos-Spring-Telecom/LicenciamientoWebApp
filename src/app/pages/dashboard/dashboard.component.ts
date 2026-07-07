import { User } from './../../_entities/User';
import { Capturista } from './../../_entities/tablero/capturista';
import { TableroService } from './../dashboard/services/tablero.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PercentPipe } from '@angular/common';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { UsuarioVM } from 'src/app/_entities/usuarios/usuarioVM';
import { ListaGrupo } from 'src/app/_entities/tablero/listaGrupo';
import { datosGraficaUsuario } from 'src/app/_entities/tablero/GraficaUsuario'
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class DashboardComponent implements OnInit {

  loadIndicatorVisible = false;
  buttonText = 'Send';
  isLoading: boolean;
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public isDisabled: boolean = true;
  public mensajeAgrupar: string = "Arrastre un encabezado de columna aquí para agrupar por esa columna"
  public loadingMessage: string = 'Cargando...';
  public interval = null;

  informacionFaltante: number;
  rechazoSinRespuesta: number;
  datosCorrectos: number;
  datosRevision: number;

  texto: string;
  percent: number;

  now: Date = new Date();
  listaInformacionFaltante: any;
  listaRechazo: any;
  listaDatosCorrectos: any;
  listaRevision: any
  lista: any;
  mes: number;
  total: number;
  estatus: string;

  private _gap = 16;
  gap = `${this._gap}px`;
  col2 = `1 1 calc(50% - ${this._gap / 8}px)`;
  col3 = `1 1 calc(99.3333% - ${this._gap / 4.5}px)`;

  public usuarios: UsuarioVM[];
  public grupos: ListaGrupo[];
  public datosGraficaUsuario: datosGraficaUsuario[];
  public listaCapturista: Capturista[];
  public datosReporte = [];
  public graficaDataSource = [];
  public resultadoGrupo = [];
  public totalRechazados: number = 0;
  public totalFaltante: number = 0;
  public totalValidados: number = 0;
  public totalRevision: number = 0;

  public datosPastel;
  public mostrarPastel: boolean = false;

  public datosGrafica;
  public all;
  public item_totals;
  public mostrarGrafica: boolean = false;

  public showFiltroGrupo: boolean = false;
  public showFiltroUsuario: boolean = false;
  public detalle: User;
  public mensajeModulo: string = 'Tablero'
  pipe: any = new PercentPipe('en-US');
  public mensaje: string = 'Dato';
  totalLicencias: number;
  public fechainicio;
  public fecha;
  public fechaFin;
  public grupo;
  public idCapturista;
  public grupotemporal;

  types: string[] = ['splinearea', 'stackedsplinearea', 'fullstackedsplinearea'];

  customizeText(e) {
    return 'Total de registros: #' + e.value + ' Capturas de locales comerciales';
  };

  constructor(
    public AuthService: AuthService, 
    private tableroService: TableroService,
    private router: Router,
    private datepipe: DatePipe) {
    this.showFilterRow = true;
    this.showHeaderFilter = true;
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit() {
    this.obtenerDetalle();
    this.obtenerTotal();
    this.obtenerListaCapturistas();
    this.obtenerGraficaMes();
    this.obtenerGraficaDia();
    this.obtenerGrupo();
  }


/*-------------------------------
	Refresh Automático
-------------------------------*/
  ngAfterContentInit() {
     this.interval = setInterval(async () => {
       this.loadingMessage = 'Actualizando...';
       this.loadingVisible = true;
        this.obtenerTotal();
        this.obtenerListaCapturistas();
        this.obtenerGraficaMes();
        this.obtenerGraficaDia();
     }, 180000);
   }
  
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 2000);
  }

  private graphicMonths: any;
  private graphicCake: any;
  private graphicFilters: any;

  ngAfterViewChecked() {
    this.graphicMonths.render();
    this.graphicCake.render();
    this.graphicFilters.render();
  }

  onInitializedMonths(evt: any) {
    this.graphicMonths = evt.component;
  }

  onInitializedCake(evt: any) {
    this.graphicCake = evt.component;
  }

  onInitializedFilters(evt: any) {
    this.graphicFilters = evt.component;
  }

  onClick(data) {
    this.buttonText = 'Sending';
    this.loadIndicatorVisible = true;

  setTimeout(() => {
    this.buttonText = 'Send';
    this.loadIndicatorVisible = false;
    }, 2000);
  }

  reload() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

/*----------------------------------------
	Obtener información del grid Capturistas
----------------------------------------*/  
  obtenerListaCapturistas() {
    // this.loadingVisible = true;
    this.tableroService.obtenerCapturista().subscribe(
      (response) => {
        this.listaCapturista = response;
        response.forEach(listaCapturista => {
          this.datosReporte.push({
            'Nombre': listaCapturista.nombre,
            'Apellido Paterno': listaCapturista.apellidoPaterno,
            'Apellido Materno': listaCapturista.apellidoMaterno,
            'Grupo': listaCapturista.nombreGrupo,
            'Supervisor': listaCapturista.nombreSupervisor,
            'Total Licencias': listaCapturista.totalLicencias,
          });
        });
        if (this.datosReporte.length) {
          this.isDisabled = false;
        }
      }, (error) => {
    })
  }


/*--------------------------------------------
	Obtener total de registros para las tarjetas 
--------------------------------------------*/
  obtenerTotal() {
    this.tableroService.getTotalDatos().subscribe(
      res => {
        this.isLoading = true;
        this.totalRechazados = res.rechazoSinRespuesta;
        this.totalRevision = res.datosRevision;
        this.totalFaltante = res.informacionFaltante;
        this.totalValidados = res.datosCorrectos;
      }, err => {}
      );
    }
    prueba() {
      this.isLoading = true;
  
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
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


/*----------------------------------------
	Obtener información para la grafica con
  filtros de busqueda
----------------------------------------*/  
  obtenerFiltros() {
    if (!this.fechainicio) {
      Swal.fire({
        title: 'Campo requerido',
        text: 'Seleccione la fecha inicial.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    this.fechainicio = this.datepipe.transform(this.fechainicio, 'yyyy-MM-dd');
    this.fechaFin = this.datepipe.transform(this.fechaFin, 'yyyy-MM-dd');
    this.tableroService.obtenerDatosUsuario(this.fechainicio, this.fechaFin, this.grupo, this.idCapturista).subscribe(
      (response) => {
        let prueba = response.lista.map(e => {
          e.fecha = e.fecha.substring(0, 10);
          return e;
        })
        this.all = response.lista.reduce((acc, { fecha, estatus, total }) => {
          acc[fecha] =
          fecha in acc
          ? {
            ...acc[fecha],
            [estatus]: (acc[fecha][estatus] || 0) + total
          }
          : { fecha, [estatus]: total };
          return acc;
        }, {});
        
        this.item_totals = Object.values(this.all);
        this.item_totals.sort(function (a, b){
          return a.fecha.localeCompare(b.fecha, 'en', { numeric: true })
        });
        if (this.item_totals.length == 0) {
          Swal.fire({
            title: '¡Ops!',
            text: `No se encuentran datos por graficar`,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
          });
        }
      }
    )
  }
    
  obtenerDetalle(){
    this.detalle = this.AuthService.getUser();
    if(this.detalle.nombreRol === "Capturista" || this.detalle.nombreRol === "Supervisor"){
      this.showFiltroGrupo = true;
      this.showFiltroUsuario = true;
    }
  }

  obtenerUsuarios(value) {
    this.tableroService.obtenerUsuarios().subscribe(
      (response: UsuarioVM[]) => {
        this.usuarios = response;
        this.resultadoGrupo = [];
        var numeroletra = (value + 9).toString(36).toUpperCase();
        var searchField = "grupo";
        var searchVal = numeroletra;
        for (var i = 0; i < response.length; i++) {
          if (response[i][searchField] == searchVal) {
            this.resultadoGrupo.push(response[i]);
          }
        }
    });
  }

  obtenerGrupo() {
    this.tableroService.obtenerGrupos().subscribe(
    (response: ListaGrupo[]) => {
        this.grupos = response;
    });
  }

  
/*------------------------------------------
	Obtener información para grafica de pastel
------------------------------------------*/
  obtenerGraficaDia() {
    this.tableroService.obtenerDatosDía().subscribe(
      (response) => {
        this.datosPastel = [
          {
            etiqueta: 'Revisión',
            percent: response.datosRevision,
            tipo: 4
          },
          {
            etiqueta: 'Rechazo o Sin Respuesta',
            percent: response.rechazoSinRespuesta,
            tipo: 1
          },
          {
            etiqueta: 'Datos Correctos',
            percent: response.datosCorrectos,
            tipo: 3
          },
          {
            etiqueta: 'Información Faltante',
            percent: response.informacionFaltante,
            tipo: 2
          }
        ];
      }, (error) => {
        console.log('Error en grafica pastel');
      }
    )
  }

  etiquetaPie(arg) {
    return arg.valueText + ' Locales Comerciales'
  }

  customizePoint(pointInfo: any) {
    switch (pointInfo.data.tipo) {
      case 1:
        return { color: '#fb2121' }
      case 2:
        return { color: '#f9c300' }
      case 3:
        return { color: '#3da73d' }
      case 4:
        return { color: '#438AE3' }
    }
  };

  customizeTooltip(arg: any) {
    return {
      text: `${arg.seriesName} total: ${arg.valueText}`,
    };
  }
}