import { MonitoreoComponent } from './monitoreo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component'
 
const routes: Routes = [
	{
	  path: "mapa",
	  component: MapaComponent
	},
	{
		path: '**',
		component: MapaComponent, pathMatch: 'full'
	},
	
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoreoRoutingModule { }
