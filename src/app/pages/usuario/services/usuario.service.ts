import { UsuarioEdicionVM } from './../../../_entities/usuarios/usuarioEdicionVM';
import { PermisoAgrupadoVM } from '../../../_entities/permisos/permisoAgrupadoVM';
import { environment } from './../../../../environments/environment';
import { UsuarioVM } from 'src/app/_entities/usuarios/usuarioVM';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {constructor(private http: HttpClient) { }

	obtenerUsuario(id: string): Observable<UsuarioEdicionVM> {
		return this.http.get<UsuarioEdicionVM>(`${environment.API_SECURITY}/api/Usuarios/${id}`);
	}

	obtenerUsuarios(): Observable<UsuarioVM[]> {
		return this.http.get<UsuarioVM[]>(environment.API_SECURITY + '/api/Usuarios');
	}

	agregarUsuario(saveForm) {
		return this.http.post(environment.API_SECURITY + '/api/Usuarios', saveForm);
	}

	actualizarUsuario(id: string, form): Observable<any> {
		return this.http.put<any>(`${environment.API_SECURITY}/api/Usuarios/${id}`, form);
	}

	eliminarUsuario(id): Observable<any> {
		return this.http.delete<any>(`${environment.API_SECURITY}/api/Usuarios/${id}`);
	}

	obtenerPermisosAgrupados(): Observable<PermisoAgrupadoVM[]> {
		return this.http.get<PermisoAgrupadoVM[]>(`${environment.API_SECURITY}/api/Permisos/agrupar/modulo`);
	}

	cambiarEstatus(id, estatus) {
		return this.http.get(environment.API_SECURITY + '/api/Usuarios/' + id + '/' + estatus);
	}
		
}
