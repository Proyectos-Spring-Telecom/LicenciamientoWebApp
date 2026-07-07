import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxFormModule, DxLoadIndicatorModule, DxLoadPanelModule, DxPopoverModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxTreeListModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
import { ModuloRoutingModule } from './modulo-routing.module';
import { ModuloComponent } from './modulo.component';
import { ListaModuloComponent } from './components/lista-modulo/lista-modulo.component';
import { AltaModuloComponent } from './components/alta-modulo/alta-modulo.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'
import { MatListModule } from '@angular/material/list'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReutilizablesModule } from '../reutilizables/reutilizables.module';
import { MatCardModule } from '@angular/material/card';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    ModuloComponent, 
    ListaModuloComponent, 
    AltaModuloComponent
  ],

  imports: [
    CommonModule,
    ModuloRoutingModule,
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
    DxFileUploaderModule,
    DxLoadIndicatorModule,
    FormsModule,
    ReactiveFormsModule,
  MatDividerModule,
  MatButtonModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatListModule,
  MatCheckboxModule,
  DragDropModule,
  ReutilizablesModule,
  FurySharedModule,
  MatCardModule,
  FuryCardModule,
  NgxPermissionsModule,
  MaterialModule,
  ]
  
})
export class ModuloModule { }
