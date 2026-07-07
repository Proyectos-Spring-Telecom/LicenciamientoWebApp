import { ChangePassword } from './../../../_entities/ChangePassword';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Register } from 'src/app/_entities/Register';
import { environment } from 'src/environments/environment';
import { User } from '../../../_entities/User';
import BaseService from './base.service';
import { ResetPassword } from 'src/app/_entities/ResetPassword';
import { catchError } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
	private authenticationChanged = new Subject<boolean>();
	private user = new User();
  constructor(private http: HttpClient,
		private permissionsService:NgxPermissionsService) {
      super();
     }

  public isAuthenticated(): boolean {
		return (!(sessionStorage.getItem('token') === undefined ||
			sessionStorage.getItem('token') === null ||
			sessionStorage.getItem('token') === 'null' ||
			sessionStorage.getItem('token') === 'undefined' ||
			sessionStorage.getItem('token') === ''));
	}

	public isAuthenticationChanged(): any {
		return this.authenticationChanged.asObservable();
	}

	public getToken(): any {
		if (sessionStorage.getItem('token') === undefined ||
			sessionStorage.getItem('token') === null ||
			sessionStorage.getItem('token') === 'null' ||
			sessionStorage.getItem('token') === 'undefined' ||
			sessionStorage.getItem('token') === '') {
			return '';
		}

		return JSON.parse(sessionStorage.getItem('token'));
	}

	public setData(data: User): void {
		this.setStorageToken(data.token);
		this.setStorageUser(data);
		this.setStoragePermissions(data.permisos);
	}

	public failToken(): void {
		this.cleanSession();
	}

	public logout(): void {
		this.cleanSession();
	}

	/** Servicios para cambiar contraseñas */
	public changePassword(body: ChangePassword): Observable<any> {
	 	return this.http.put(environment.API_SECURITY + '/api/Authentication/CambiarPassword', body)
	}

	public requestPassword(email: string){
		return this.http.get(environment.API_SECURITY + '/api/Authentication/SolicitarReiniciarPassword/' + email, {responseType: 'text'})
	}

	public resetPassword(body: ResetPassword): Observable<any> {
		return this.http.post<any>(environment.API_SECURITY + '/api/Authentication/ReiniciarPassword', body)
			.pipe(catchError(this.handleError));
	}
	/** Fin de cambiar contraseñas */

	private setStorageToken(value: any): void {
		let _value = JSON.stringify(value);
		sessionStorage.setItem('token', _value);
		this.authenticationChanged.next(this.isAuthenticated());
	}

	public setStorageHWToken(hwtoken: any): void {
		let _value = JSON.stringify(hwtoken);
		sessionStorage.setItem('hwtoken', _value);

	}

	private setStorageUser(value: any): void {
		let _value = JSON.stringify(value);
		sessionStorage.setItem('user', _value);
		this.authenticationChanged.next(this.isAuthenticated());
	}

	public setStorageCoordinate(coordinates): void {
		let coords = JSON.stringify(coordinates);
		sessionStorage.setItem('coordinates', coords);
	}

	public register(body: Register): Observable<any> {
		return this.http.post<any>(environment.API_SECURITY + '/api/Authentication/InsertarUsuario', body);
	}


	private setStoragePermissions(permissions: Array<string>): void {
		let _value = JSON.stringify(permissions);
		sessionStorage.setItem('permissions', _value);
		this.permissionsService.loadPermissions(permissions);
		this.authenticationChanged.next(this.isAuthenticated());
	}

	public cleanSession() {
		sessionStorage.clear();
	}

	public getUser(): User {
		// console.log(JSON.parse(sessionStorage.getItem('user')));
		return JSON.parse(sessionStorage.getItem('user'));
	}


	public getCoordinates() {
		return JSON.parse(sessionStorage.getItem('coordinates'))
	}

	public getPermissions(): string[] {
		return JSON.parse(sessionStorage.getItem('permissions'));
	}

	public authenticate(body): Observable<User> {
		return this.http.post<User>('http://www.gtmtec.mx/licenciamiento/licenciasapi/api/Authentication/Token', body)
			//.pipe(catchError(this.handleError));
	}
}
