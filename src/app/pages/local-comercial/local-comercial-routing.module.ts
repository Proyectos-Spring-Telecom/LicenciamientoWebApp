import { DetalleLocalComercialComponent } from './components/detalle-local-comercial/detalle-local-comercial.component';
import { AltaLocalComercialComponent } from './components/alta-local-comercial/alta-local-comercial.component';
import { ListaLocalComercialComponent } from './components/lista-local-comercial/lista-local-comercial.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarLocalComercialComponent } from './components/editar-local-comercial/editar-local-comercial.component';

const routes: Routes = [
  {
    path: '',
		children: [
			{
				path: 'lista-local-comercial',
				component: ListaLocalComercialComponent
			},
      {
				path: 'actualizar-local-comercial/:id',
				component: EditarLocalComercialComponent
			},
      { 
        path: 'alta-local-comercial',
        component: AltaLocalComercialComponent
      },
      // {
      //   path: 'editar-local-comercial/:id',
      //   component: AltaLocalComercialComponent

      // },
      {
        path: 'detalle-local-comercial/:id',
        component: DetalleLocalComercialComponent
      },
      {
        path: '**',
        component: ListaLocalComercialComponent, pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalComercialRoutingModule { }
