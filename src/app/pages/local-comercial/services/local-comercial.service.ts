import { environment } from './../../../../environments/environment';
import { FormGenerico } from './../../../_entities/FormGenerico';
import { DetalleLocal } from './../../../_entities/local-comercial/detalle-local-comercial';
import { LocalComercial } from './../../../_entities/local-comercial/local-comercial';
import { ListaRol } from './../../../_entities/local-comercial/Catalogos/roles';
import { ListaGrupo } from './../../../_entities/local-comercial/Catalogos/grupo';
import { ListaTipoFoto } from './../../../_entities/local-comercial/Catalogos/tipoFoto';
import { listaTipoServicio } from './../../../_entities/local-comercial/Catalogos/tipoServicio';
import { ListaEstatus } from './../../../_entities/local-comercial/Catalogos/estatus';
import { ListaGiro } from './../../../_entities/local-comercial/Catalogos/giro'; 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocalComercialService { 
  
  constructor(private http: HttpClient) { }  

  agregarLocalComercial(formdata) {
		return this.http.post(environment.API_SECURITY + '/api/Licencias/', formdata);
	}

  actualizarLocal(formData): Observable<any> {
		return this.http.put<any>(environment.API_SECURITY + '/api/Licencias', formData);
	}

  eliminarLocalComercial(id: Number) {
		return this.http.delete(environment.API_SECURITY + '/api/Licencias/' + id);
	}

  obtenerListaLocal(fechaInicio, fechaFinal): Observable<LocalComercial[]> {
    return this.http.get<LocalComercial[]>(environment.API_SECURITY + '/api/licencias/', {
      params: {
       fechaInicio: fechaInicio,
       fechaFinal: fechaFinal
      }}
    );
  }

  obtenerListaLocalComercial(): Observable<LocalComercial[]> {
    return this.http.get<LocalComercial[]>(environment.API_SECURITY + '/api/licencias/');
  }

  // obtenerListaLocalesMapa(): Observable<LocalComercial[]> {
  //   return this.http.get<LocalComercial[]>(environment.API_SECURITY + '/api/licencias/');
  // }

  obtenerListaLocalesMapa(): Observable<LocalComercial[]> {
    const fechaInicio = '2021-01-01 00:00:00';
    const fechaFinal = this.formatFechaApi(new Date());
    return this.http.get<LocalComercial[]>(environment.API_SECURITY + '/api/licencias/', {
      params: {
        fechaInicio,
        fechaFinal
      }
    });
  }

  private formatFechaApi(fecha: Date): string {
    const pad = (valor: number) => valor.toString().padStart(2, '0');
    return `${fecha.getFullYear()}-${pad(fecha.getMonth() + 1)}-${pad(fecha.getDate())} ${pad(fecha.getHours())}:${pad(fecha.getMinutes())}:${pad(fecha.getSeconds())}`;
  }

  obtenerDetalleLocalComercial(idLicencia: Number): Observable<DetalleLocal> {
    return this.http.get<DetalleLocal>(environment.API_SECURITY + '/api/Licencias/' + idLicencia);
  }

  cambiarEstatus(id, nombreEstatus) {
      return this.http.get(environment.API_SECURITY + '/api/Licencias/Estatus/' + id + '/' + nombreEstatus); 
  }

      /*Ubicaciones*/
      obtenerEstados(): Observable<FormGenerico[]> {
        return this.http.get<FormGenerico[]>(`${environment.API_SECURITY}/api/Direcciones/estados`);
      }

      obtenerMunicipiosEstado(): Observable<FormGenerico[]> {
          return this.http.get<FormGenerico[]>(`${environment.API_SECURITY}/api/Direcciones/estados/municipios`);
      }

      obtenerLocalidadesMunicipio(idMunicipio): Observable<FormGenerico[]> {
          return this.http.get<FormGenerico[]>(`${environment.API_SECURITY}/api/Direcciones/municipios/${idMunicipio}/localidades`);
      }

      obtenerColoniasLocalidad(idLocalidad): Observable<FormGenerico[]> {
          return this.http.get<FormGenerico[]>(`${environment.API_SECURITY}/api/Direcciones/localidades/${idLocalidad}/colonias`);
      }

      obtenerCallesColonia(idColonia): Observable<FormGenerico[]> {
        return this.http.get<FormGenerico[]>(`${environment.API_SECURITY}/api/Direcciones/colonias/${idColonia}/vialidades`);
      }
      /*Fin de ubicaciones*/

  /*Catalogos*/
  obtenerRoles(): Observable<ListaRol[]>{
    return this.http.get<ListaRol[]>(environment.API_SECURITY + '/api/RolesCatalogo');
  }

  obtenerGrupos(): Observable<ListaGrupo[]>{
    return this.http.get<ListaGrupo[]>(environment.API_SECURITY + '/api/GruposCatalogo');
  }

  obtenerTipoFoto(): Observable<ListaTipoFoto[]>{
    return this.http.get<ListaTipoFoto[]>(environment.API_SECURITY + '/api/TipoFotosCatalogo');
  }

  obtenerTiposServicios(): Observable<listaTipoServicio[]>{
    return this.http.get<listaTipoServicio[]>(environment.API_SECURITY + '/api/TipoServicioCatalogo');
  }

  obtenerEstatus(): Observable<ListaEstatus[]>{
    return this.http.get<ListaEstatus[]>(environment.API_SECURITY + '/api/CatalogoEstatus');
  }

  obtenerGiros(): Observable<ListaGiro[]>{
    return this.http.get<ListaGiro[]>(environment.API_SECURITY + '/api/GirosCatalogo');
  }
  /*Fin de catalogos*/
}