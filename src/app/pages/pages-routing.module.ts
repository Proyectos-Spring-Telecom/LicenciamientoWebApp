import { ModuloModule } from './modulo/modulo.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from './auth/Guard/auth.Guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
       { path: '', component: DashboardComponent },
       { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
       { path: 'modulo', loadChildren: () => import('./modulo/modulo.module').then(m => m.ModuloModule) },
       { path: 'permiso', loadChildren: () => import('./permiso/permiso.module').then(m => m.PermisoModule) },
       { path: 'monitoreo', loadChildren:() => import('./monitoreo/monitoreo.module').then(m => m.MonitoreoModule)},
       { path: 'local-comercial',loadChildren:()=>import('./local-comercial/local-comercial.module').then(m=> m.LocalComercialModule)},
       { path: 'monitoreo', loadChildren:()=>import('./monitoreo/monitoreo.module').then(m=>m.MonitoreoModule)},
       { path: 'alumbrado', loadChildren:()=>import('./alumbrado/alumbrado.module').then(m=>m.AlumbradoModule)},

      { path: '', redirectTo: 'tablero/tablas', pathMatch: 'full' },
      { path: '**', redirectTo: 'tablero/tablas', pathMatch: 'full' }
    ]
  }
  
    /*{path: '', loadChildren: () => import('../pages/auth/auth.module').then(m => m.AuthModule) },
    { path: 'tablero', loadChildren: () => import ('./tablero/tablero.module').then(m => m.TableroModule) },*/
  
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class PagesRoutingModule { }
