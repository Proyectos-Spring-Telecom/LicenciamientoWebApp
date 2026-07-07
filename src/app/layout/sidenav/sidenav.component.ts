import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SidenavItem } from './sidenav-item/sidenav-item.interface';
import { SidenavService } from './sidenav.service';
import { ThemeService } from '../../../@fury/services/theme.service';
import { AuthService } from '../../pages/auth/services/auth.service';
import { Permiso } from 'src/app/_entities/enums/permiso.enum';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';

@Component({
  selector: 'fury-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class SidenavComponent implements OnInit, OnDestroy {
  public permisoUsuarios: string;
  public permisoLocalesComerciales: string;
  public permisoPermisos: string;
  public permisoModulos: string;
  public permisoLuminaria: string;

  sidenavUserVisible$ = this.themeService.config$.pipe(map(config => config.sidenavUserVisible));

  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  @HostBinding('class.expanded')
  expanded: boolean;

  items$: Observable<SidenavItem[]>;
  private routerEventsSub: Subscription;
  currentUrl = '';

  constructor(private router: Router,
              private sidenavService: SidenavService,
              private themeService: ThemeService,private auth: AuthService) {
                this.permisoUsuarios = Permiso.ConsultarUsuarios;
                this.permisoLocalesComerciales = Permiso.ConsultarLocalesComerciales;
                this.permisoPermisos = Permiso.ConsultarPermisos;
                this.permisoModulos = Permiso.ConsultarModulo;
                this.permisoLuminaria = Permiso.ConsultarLuminarias;
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.routerEventsSub = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.currentUrl = event.urlAfterRedirects;
    });

    this.items$ = this.sidenavService.items$.pipe(
      map((items: SidenavItem[]) => this.sidenavService.sortRecursive(items, 'position'))
    );
  }

  isModuleActive(modulePrefix: string): boolean {
    const url = this.currentUrl.split('?')[0];
    return url === modulePrefix || url.startsWith(modulePrefix + '/');
  }

  toggleCollapsed() {
    this.sidenavService.toggleCollapsed();
  }

  /*Enrutamiento*/
  Tablero(){
    this.router.navigateByUrl('/dashboard')
  }

  Monitoreo(){
    this.router.navigateByUrl('/monitoreo/mapa')
  }

  LocalesComerciales(){
    this.router.navigateByUrl('/local-comercial/lista-local-comercial')
  }

  Usuarios(){
    this.router.navigateByUrl('/usuario/lista-usuario')
  }

  Permisos(){
    this.router.navigateByUrl('/permiso/lista-permiso')
  }

  Modulos(){
    this.router.navigateByUrl('/modulo/lista-modulo')
  }

  Luminaria(){
    this.router.navigateByUrl('/alumbrado/lista-alumbrado')
  }

  CerrarSesion(){
    this.router.navigateByUrl('/login')
  }
  /**Fin de rutas */

  @HostListener('mouseenter')
  @HostListener('touchenter')
  onMouseEnter() {
    this.sidenavService.setExpanded(true);
  }

  @HostListener('mouseleave')
  @HostListener('touchleave')
  onMouseLeave() {
    this.sidenavService.setExpanded(false);
  }

  ngOnDestroy() {
    this.routerEventsSub?.unsubscribe();
  }

  logout() {

		this.auth.logout();
		this.router.navigate(['/login']);
		
		// this.store.dispatch(new Logout());
	}
  public get Permiso() {
		return Permiso;
	  }
}
