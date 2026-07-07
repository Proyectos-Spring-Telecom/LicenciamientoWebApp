import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaModuloComponent } from './components/alta-modulo/alta-modulo.component';
import { ListaModuloComponent } from './components/lista-modulo/lista-modulo.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'lista-modulo',
				component: ListaModuloComponent
			},
			{
			 	path: 'alta-modulo',
			 	component: AltaModuloComponent
			},
			{
			 	path: 'editar/:idModulo',
			 	component: AltaModuloComponent
			},
			{
				path: '**',
				component: ListaModuloComponent, pathMatch: 'full'
			},
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloRoutingModule { }
