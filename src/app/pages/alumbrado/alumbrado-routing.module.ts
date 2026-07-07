import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaAlumbradoComponent } from './components/alta-alumbrado/alta-alumbrado.component';
import { DashboardAlumbradoComponent } from './components/dashboard-alumbrado/dashboard-alumbrado.component';
import { DetalleAlumbradoComponent } from './components/detalle-alumbrado/detalle-alumbrado.component';
import { ListaAlumbradoComponent } from './components/lista-alumbrado/lista-alumbrado.component';

const routes: Routes = [
  {
    path: '',
		children: [
			{
				path: 'dashboard-alumbrado',
				component: DashboardAlumbradoComponent
			},
      {
        path: 'detalle-alumbrado',
        component: DetalleAlumbradoComponent
      },
      {
        path: 'alta-alumbrado',
        component: AltaAlumbradoComponent
      },
      {
        path: 'lista-alumbrado',
        component: ListaAlumbradoComponent
      },
      {
				path: '**',
				component: ListaAlumbradoComponent, pathMatch: 'full'
			},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumbradoRoutingModule { }
