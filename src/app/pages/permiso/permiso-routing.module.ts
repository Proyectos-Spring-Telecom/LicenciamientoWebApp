import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaPermisoComponent } from './components/alta-permiso/alta-permiso.component';
import { ListaPermisoComponent } from './components/lista-permiso/lista-permiso.component';

const routes: Routes = [
  {
		path: '',
		children: [
			{
				path: 'lista-permiso',
				component: ListaPermisoComponent
			},
			 {
			   	path: 'alta-permiso',
			   	component: AltaPermisoComponent
			 },
			{
				path: 'editar/:idPermiso',
			 	component: AltaPermisoComponent
			},
			{
				path: '**',
				component: ListaPermisoComponent, pathMatch: 'full'
			},
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisoRoutingModule { }
