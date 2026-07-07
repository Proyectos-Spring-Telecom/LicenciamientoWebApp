import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { MonitoreoComponent } from './monitoreo.component';
import { MapaComponent } from './mapa/mapa.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ReutilizablesModule } from '../reutilizables/reutilizables.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { DxLoadPanelModule } from 'devextreme-angular';


@NgModule({
  declarations: [MonitoreoComponent, MapaComponent],
  imports: [
    CommonModule,
    MonitoreoRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    ReutilizablesModule,
    FurySharedModule,
    DxLoadPanelModule,
  ]
})
export class MonitoreoModule { }
