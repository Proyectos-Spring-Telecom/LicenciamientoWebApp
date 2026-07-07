import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavService } from '../sidenav.service';
import { SidenavItem } from './sidenav-item.interface';
import isFunction from 'lodash-es/isFunction';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { Permiso } from 'src/app/_entities/enums/permiso.enum';

@Component({
  selector: 'fury-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  animations: [
    trigger('dropdownOpen', [
      state('false', style({
        height: 0
      })),
      state('true', style({
        height: '*'
      })),
      transition('false <=> true', animate('300ms cubic-bezier(.35, 0, .25, 1)'))
    ])
  ]
})
export class SidenavItemComponent implements OnInit {
  public permisoUsuarios: string;
  public permisoLocalesComerciales: string;
  public permisoPermisos: string;
  public permisoModulos: string;

  @Input('item') item: SidenavItem;
  @Input('level') level: number;

  isCollapsed$ = this.sidenavService.collapsed$;
  dropdownOpen$: Observable<boolean>;

  constructor(private sidenavService: SidenavService, private router: Router,private auth: AuthService) {
    this.permisoLocalesComerciales = Permiso.ConsultarLocalesComerciales;
    this.permisoUsuarios = Permiso.ConsultarLocalesComerciales;
    this.permisoPermisos = Permiso.ConsultarLocalesComerciales;
    this.permisoModulos = Permiso.ConsultarLocalesComerciales;
    
  }

  get levelClass() {
    return `level-${this.level}`;
  }

  ngOnInit() {
  }

  isFunction(routeOrFunction: string[] | Function) {
    return isFunction(routeOrFunction);
  }


  logout() {

		this.auth.logout();
		this.router.navigate(['/login']);
		
		// this.store.dispatch(new Logout());
	}
}
