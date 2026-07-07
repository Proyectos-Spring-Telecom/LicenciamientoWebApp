import { environment } from './../../../../environments/environment';
import { Modulo } from './../../../_entities/modulos/modulo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ModuloService {constructor(private http: HttpClient) {}

  obtenerModulos(): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(environment.API_SECURITY + '/api/Modulos');
  }

  obtenerModulo(idModulo: Number): Observable<Modulo> {
    return this.http.get<Modulo>(environment.API_SECURITY + '/api/Modulos/' + idModulo);
  }

  agregarModulo(saveForm) {
    return this.http.post(environment.API_SECURITY + '/api/Modulos', saveForm);
  }

  actualizarModulo(saveForm) {
    return this.http.put(environment.API_SECURITY + '/api/Modulos', saveForm);
  }

  eliminarModulo(idModulo: Number) {
    return this.http.delete(environment.API_SECURITY + '/api/Modulos/' + idModulo);
  }
}
