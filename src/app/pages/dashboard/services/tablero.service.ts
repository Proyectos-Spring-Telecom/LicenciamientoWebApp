import { datosGraficaMes } from './../../../_entities/tablero/GraficasMes';
import { Dashboard } from './../../../_entities/tablero/dashboard';
import { environment } from './../../../../environments/environment';
import { Capturista } from './../../../_entities/tablero/capturista';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GraficaDia } from '../../../_entities/tablero/graficaDia';
import { datosGraficaUsuario } from '../../../_entities/tablero/GraficaUsuario';
import { UsuarioVM } from '../../../_entities/tablero/usuariosTablero';
import { ListaGrupo } from '../../../_entities/tablero/listaGrupo'

@Injectable({
	providedIn: 'root'
})
export class TableroService {
	public basePath;
	public params;

	constructor(private http: HttpClient) { }

	obtenerCapturista(): Observable<Capturista[]> {
		return this.http.get<Capturista[]>(environment.API_SECURITY + '/api/Dashboard/VisitasCapturista');
	}

	getTotalDatos(): Observable<Dashboard> {
		return this.http.get<Dashboard>(`${environment.API_SECURITY}/api/Dashboard/Totalizador`);
	}

	obtenerDatosDía(): Observable<GraficaDia> {
		return this.http.get<GraficaDia>(environment.API_SECURITY + '/api/Dashboard/TotalDia');
	}

	obtenerDatosMes(): Observable<datosGraficaMes> {
		return this.http.get<datosGraficaMes>(environment.API_SECURITY + '/api/Dashboard/GraficaMes');
	}

	obtenerDatosUsuario(fechainicio, fechaFin, grupo, idCapturista): Observable<datosGraficaUsuario> {
		this.basePath = "/myConts";
		this.params = { fechaFin: fechaFin };
		if (fechainicio)
			this.params = { fechainicio: fechainicio, fechaFin: fechaFin };
		if (grupo)
			this.params = { fechaFin: fechaFin, fechainicio: fechainicio, grupo: grupo };
		if (idCapturista)
			this.params = { fechaFin: fechaFin, fechainicio: fechainicio, grupo: grupo, idCapturista: idCapturista };

		return this.http.get<datosGraficaUsuario>(environment.API_SECURITY + '/api/Dashboard/TotalFiltros',
			{
				params: this.params
			});
	}

	obtenerUsuarios(): Observable<UsuarioVM[]> {
		return this.http.get<UsuarioVM[]>(environment.API_SECURITY + '/api/Usuarios');
	}

	obtenerGrupos(): Observable<ListaGrupo[]> {
		return this.http.get<ListaGrupo[]>(environment.API_SECURITY + '/api/GruposCatalogo');
	}

}
