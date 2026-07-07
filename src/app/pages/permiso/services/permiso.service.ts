import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modulo } from './../../../_entities/modulos/modulo';
import { environment } from './../../../../environments/environment';
import { PermisoModule, PermisosModule } from './../../../_entities/permisos-module/permiso-module';


@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private http: HttpClient) { }

  obtenerPermisos(): Observable<PermisosModule[]>{
    return this.http.get<PermisosModule[]>(environment.API_SECURITY + '/api/permisos')
  }

  obtenerModulos(): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(environment.API_SECURITY + '/api/Modulos');
  }

  obtenerPermiso(idPermiso: String): Observable<PermisoModule>{
	  return this.http.get<PermisoModule>(environment.API_SECURITY + '/api/permisos/' + idPermiso);
  }

  agregarPermiso(permisoForm) {
	  return this.http.post(environment.API_SECURITY + '/api/permisos', permisoForm);
  }

  actualizarPermiso(permisoForm, idPermiso: String) {
    return this.http.put(environment.API_SECURITY + '/api/permisos/' + idPermiso, permisoForm);
  }
  
  eliminarPermiso(idPermiso: String){
   return this.http.delete<PermisoModule>(environment.API_SECURITY + '/api/permisos/' + idPermiso);
  }
}
