import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './pages/auth/Guard/auth.Guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        pathMatch: 'full'
      },
      {
        path: 'alumbrado',
        loadChildren: () => import('../app/pages/alumbrado/alumbrado.module').then(m => m.AlumbradoModule),
        // pathMatch: 'full'
      },
      {
        path: 'monitoreo',
        loadChildren: () => import('../app/pages/monitoreo/monitoreo.module').then(m => m.MonitoreoModule),
        // pathMatch: 'full'
      },
      {
        path: 'local-comercial',
        loadChildren: () => import('../app/pages/local-comercial/local-comercial.module').then(m => m.LocalComercialModule),
        // pathMatch: 'full'
      },
      {
        path: 'usuario',
        loadChildren: () => import('../app/pages/usuario/usuario.module').then(m => m.UsuarioModule),
        // pathMatch: 'full'
      },
      {
        path: 'permiso',
        loadChildren: () => import('../app/pages/permiso/permiso.module').then(m => m.PermisoModule),
        // pathMatch: 'fudll'
      },
      {
        path: 'modulo',
        loadChildren: () => import('../app/pages/modulo/modulo.module').then(m => m.ModuloModule),
        // pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // initialNavigation: 'enabled',
    // // preloadingStrategy: PreloadAllModules,
    // scrollPositionRestoration: 'enabled',
    // anchorScrolling: 'enabled',
    // relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
