import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { SplashScreenService } from '../@fury/services/splash-screen.service';
import { Permiso } from './_entities/enums/permiso.enum';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public permisoLocalesComerciales: string;
  public permisoUsuarios: string;
  public permisoPermisos: string;
  public permisoModulos: string;

  constructor(private sidenavService: SidenavService,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    private permissionsService: NgxPermissionsService,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    private route: ActivatedRoute,
    private authService: AuthService,
    private splashScreenService: SplashScreenService) {
    this.permisoLocalesComerciales = Permiso.ConsultarLocalesComerciales;
    this.permisoUsuarios = Permiso.ConsultarLocalesComerciales;
    this.permisoPermisos = Permiso.ConsultarLocalesComerciales;
    this.permisoModulos = Permiso.ConsultarLocalesComerciales;
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.themeService.setStyle(queryParamMap.get('style')));

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe(theme => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.sidenavService.addItems([
      {
        name: 'ADMINISTRACIÓN',
        position: 5,
        type: 'subheading',
        customClass: 'first-subheading',
      },
      {
        name: 'Tablero',
        routeOrFunction: '/dashboard',
        icon: 'dashboard',
        position: 10,
        pathMatchExact: true,
      },
      {
        name: 'Monitoreo',
        routeOrFunction: '/monitoreo/mapa',
        icon: 'map',
        //  badge: '22',
        badgeColor: '#2196F3',
        position: 15,
      },
      {
        name: 'Locales Comerciales',
        routeOrFunction: '/local-comercial/lista-local-comercial',
        icon: 'store_mall_directory',
        position: 20,
        permisoUsuarios: Permiso.ConsultarLocalesComerciales,
      },
      {
        name: 'Luminarias',
        routeOrFunction: '/alumbrado/lista-alumbrado',
        icon: 'wb_incandescent',
        position: 25,
      },
      {
        name: 'Usuarios',
        routeOrFunction: '/usuario/lista-usuario',
        icon: 'person',
        position: 25,
        permission: Permiso.ConsultarUsuarios,
      },
      {
        name: 'Permisos',
        routeOrFunction: '/permiso/lista-permiso',
        icon: 'settings',
        position: 30,
        permission: Permiso.ConsultarPermisos,
        //  badge: '14',

      },
      {
        name: 'Módulos',
        routeOrFunction: '/modulo/lista-modulo',
        icon: 'storage',
        position: 30,
        permission: Permiso.ConsultarModulo,
        // badge: '14',

      },
      {
        name: 'FINALIZAR SESIÓN',
        type: 'subheading',
        position: 35
      },
      // {
      //   name: 'Components',
      //   routeOrFunction: '/components',
      //   icon: 'layers',
      //   position: 40
      // },
      // {
      //   name: 'Adminitración',
      //   routeOrFunction: '/',
      //   icon: 'dashboard',
      //   position: 45,
      //   subItems: [
      //     {
      //       name: 'Tablero',
      //       routeOrFunction: '/tables/all-in-one-table',
      //       position: 10
      //     },
      //     {
      //       name: 'Monitoreo',
      //       routeOrFunction: '/forms/form-wizard',
      //       position: 15
      //     },
      //     {
      //       name: 'Locales Comerciales',
      //       routeOrFunction: '/components',
      //       position: 20
      //     },
      //     {
      //       name: 'Usuarios',
      //       routeOrFunction: '/icons',
      //       position: 25
      //     },
      //     {
      //       name: 'Permisos',
      //       routeOrFunction: '/apps/chat',
      //       position: 30
      //     },
      //     {
      //       name: 'Módulos',
      //       routeOrFunction: '/page-layouts/simple',
      //       position: 35
      //     },
      //   ]
      // },
      {
        name: 'Cerrar Sesión',
        routeOrFunction: '/login',
        icon: 'exit_to_app',
        position: 55
      },
      // {
      //   name: 'WYSIWYG Editor',
      //   routeOrFunction: '/editor',
      //   icon: 'format_shapes',
      //   position: 60
      // },
      // {
      //   name: 'PAGES',
      //   type: 'subheading',
      //   position: 65
      // },
      // {
      //   name: 'Authentication',
      //   icon: 'lock',
      //   position: 66,
      //   subItems: [
      //     {
      //       name: 'Login Page',
      //       routeOrFunction: '/login',
      //       position: 5
      //     },
      //     {
      //       name: 'Register Page',
      //       routeOrFunction: '/register',
      //       position: 10
      //     },
      //     {
      //       name: 'Forgot Password',
      //       routeOrFunction: '/forgot-password',
      //       position: 15
      //     }
      //   ]
      // },
      // {
      //   name: 'Page Layouts',
      //   icon: 'view_compact',
      //   position: 67,
      //   subItems: [
      //     {
      //       name: 'Simple',
      //       routeOrFunction: '/page-layouts/simple',
      //       position: 5
      //     },
      //     {
      //       name: 'Simple Tabbed',
      //       routeOrFunction: '/page-layouts/simple-tabbed',
      //       position: 5
      //     },
      //     {
      //       name: 'Card',
      //       routeOrFunction: '/page-layouts/card',
      //       position: 10
      //     },
      //     {
      //       name: 'Card Tabbed',
      //       routeOrFunction: '/page-layouts/card-tabbed',
      //       position: 15
      //     },
      //   ]
      // },
      // {
      //   name: 'Coming Soon',
      //   routeOrFunction: '/coming-soon',
      //   icon: 'watch_later',
      //   position: 68
      // },
      // {
      //   name: 'Blank',
      //   routeOrFunction: '/blank',
      //   icon: 'picture_in_picture',
      //   position: 69
      // },
      // {
      //   name: 'Maps',
      //   icon: 'map',
      //   position: 70,
      //   subItems: [
      //     {
      //       name: 'Google Maps',
      //       routeOrFunction: '/maps/google-maps',
      //       position: 0
      //     }
      //   ],
      //   badge: '3',
      //   badgeColor: '#4CAF50'
      // },
      // {
      //   name: 'Material Icons',
      //   routeOrFunction: '/icons',
      //   icon: 'grade',
      //   position: 75
      // },
      // {
      //   name: 'Multi-Level Menu',
      //   icon: 'menu',
      //   position: 85,
      //   subItems: [
      //     {
      //       name: 'Level 1',
      //       subItems: [
      //         {
      //           name: 'Level 2',
      //           subItems: [
      //             {
      //               name: 'Level 3',
      //               subItems: [
      //                 {
      //                   name: 'Level 4',
      //                   subItems: [
      //                     {
      //                       name: 'Level 5',
      //                       routeOrFunction: '/level1/level2/level3/level4/level5'
      //                     }
      //                   ]
      //                 }
      //               ]
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]);
  }
  public get Permiso() {
    return Permiso;
  }

  ngOnInit(): void {
    this.loadRolesWithPermissions();
  }

  loadRolesWithPermissions() {
    this.permissionsService.flushPermissions();
    const permissions = this.authService.getPermissions();
    this.permissionsService.loadPermissions(permissions);
  }
}
