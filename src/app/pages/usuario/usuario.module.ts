import { MatCheckboxModule } from '@angular/material/checkbox';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxLoadIndicatorModule, DxLoadPanelModule, DxPopoverModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxTreeListModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { ReutilizablesModule } from '../reutilizables/reutilizables.module';
import { MatCardModule } from '@angular/material/card';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [UsuarioComponent, ListaUsuarioComponent, AltaUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
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
  MatDividerModule,
  MatCardModule,
  ReutilizablesModule,
  ReactiveFormsModule,
  FormsModule,
  FurySharedModule,
  FuryCardModule,
  MatCheckboxModule,
  MaterialModule,
  NgxPermissionsModule,
  ]
})
export class UsuarioModule { }
