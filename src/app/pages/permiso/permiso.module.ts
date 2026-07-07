
import { MatCardModule } from '@angular/material/card';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxLoadIndicatorModule, DxLoadPanelModule, DxPopoverModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxTreeListModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';

import { PermisoRoutingModule } from './permiso-routing.module';
import { PermisoComponent } from './permiso.component';
import { ListaPermisoComponent } from './components/lista-permiso/lista-permiso.component';
import { AltaPermisoComponent } from './components/alta-permiso/alta-permiso.component';
import { ReutilizablesModule } from '../reutilizables/reutilizables.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [
    PermisoComponent, 
    ListaPermisoComponent,  
    AltaPermisoComponent
  ],

  imports: [
    CommonModule,
    PermisoRoutingModule,
    DxTemplateModule,
    DxButtonModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTreeListModule,
    DxFormModule,
    DxPopoverModule,
	DxPopupModule,
	DxLoadPanelModule,
	DxTextAreaModule,
	DxTextBoxModule,
	DxDateBoxModule,
	DxValidatorModule,
	DxValidationGroupModule,
  DxLoadIndicatorModule,
  ReutilizablesModule,
  MatDividerModule,
  ReactiveFormsModule,
  FormsModule,
  FurySharedModule,
  MatCardModule,
  FuryCardModule,
  MaterialModule,
  NgxPermissionsModule,
  ]
})
export class PermisoModule { }
