import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DxTemplateModule,
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
  DxMapModule,
  DxLoadIndicatorModule, } from 'devextreme-angular';
import { MatCardModule} from '@angular/material/card';
import { LocalComercialRoutingModule } from './local-comercial-routing.module';
import { LocalComercialComponent } from './local-comercial.component';
import { ListaLocalComercialComponent } from './components/lista-local-comercial/lista-local-comercial.component';
import { AltaLocalComercialComponent } from './components/alta-local-comercial/alta-local-comercial.component';
import { DetalleLocalComercialComponent } from './components/detalle-local-comercial/detalle-local-comercial.component';
import { ReutilizablesModule } from '../reutilizables/reutilizables.module';
import { GaleriaComponent } from './components/detalle-local-comercial/galeria/galeria.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GoogleMapsModule } from '@angular/google-maps';
import { EditarLocalComercialComponent } from './components/editar-local-comercial/editar-local-comercial.component';
import { SeleccionUbicacionModalComponent } from './components/seleccion-ubicacion-modal/seleccion-ubicacion-modal.component';
import { SubirDocumentoModalComponent } from './components/subir-documento-modal/subir-documento-modal.component';


@NgModule({
  declarations: [LocalComercialComponent, ListaLocalComercialComponent, AltaLocalComercialComponent, DetalleLocalComercialComponent, GaleriaComponent, EditarLocalComercialComponent, SeleccionUbicacionModalComponent, SubirDocumentoModalComponent],
  imports: [
    CommonModule,
    LocalComercialRoutingModule,
    DxTemplateModule,
    DxButtonModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTreeListModule,
    DxFormModule,
    DxPopoverModule,
    DxMapModule,
    DxValidationGroupModule,
    DxPopupModule,
    DxLoadPanelModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxMapModule,
    DxLoadIndicatorModule,
    FormsModule,
    ReactiveFormsModule,
    ReutilizablesModule,
    FurySharedModule,
    FuryCardModule,
    MaterialModule,
    NgxPermissionsModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBarModule,
    MatStepperModule,
    GoogleMapsModule
  ],
  providers: [
    DatePipe
  ]
})
export class LocalComercialModule { }
