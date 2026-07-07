import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';

const routes: Routes = [
  {
		path: '',
		children: [
			{
				path: 'lista-usuario',
				component: ListaUsuarioComponent
			},
			  {
			    path: 'alta-usuario',
			    component: AltaUsuarioComponent
			 },
			 {
				path: 'editar/:idUsuario',
			 	component: AltaUsuarioComponent
			},
			{
				path: '**',
				component: ListaUsuarioComponent, pathMatch: 'full'
			},
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
