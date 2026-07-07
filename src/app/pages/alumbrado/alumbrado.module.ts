import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AfterViewChecked, NgModule } from '@angular/core';
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
DxChartModule,
DxPieChartModule, } from 'devextreme-angular';
import { MatCardModule} from '@angular/material/card';

import { AlumbradoRoutingModule } from './alumbrado-routing.module';
// import { LocalComercialComponent } from './local-comercial.component';
import { ListaAlumbradoComponent } from './components/lista-alumbrado/lista-alumbrado.component';
// import { AltaLocalComercialComponent } from './components/alta-local-comercial/alta-local-comercial.component';
import { DetalleAlumbradoComponent } from './components/detalle-alumbrado/detalle-alumbrado.component';
import { ReutilizablesModule } from '../reutilizables/reutilizables.module';
// import { GaleriaComponent } from './components/detalle-local-comercial/galeria/galeria.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardAlumbradoComponent } from './components/dashboard-alumbrado/dashboard-alumbrado.component';
import { DxoSmallValuesGroupingModule } from 'devextreme-angular/ui/nested';
import { QuickInfoWidgetModule } from '../dashboard/widgets/quick-info-widget/quick-info-widget.module';
import { AltaAlumbradoComponent } from './components/alta-alumbrado/alta-alumbrado.component';
// import { EditarLocalComercialComponent } from './components/editar-local-comercial/editar-local-comercial.component';


@NgModule({
  declarations: [DetalleAlumbradoComponent, ListaAlumbradoComponent, DashboardAlumbradoComponent, AltaAlumbradoComponent],
  imports: [
    CommonModule,
    AlumbradoRoutingModule,
    DxTemplateModule,
    DxButtonModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxChartModule,
    DxPieChartModule,
    DxoSmallValuesGroupingModule,
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
    DxPieChartModule,
    DxChartModule,


    FormsModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    MaterialModule,
    ReutilizablesModule,
    FurySharedModule,
    FuryCardModule,
    MaterialModule,
    MatCardModule,
    NgxPermissionsModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    QuickInfoWidgetModule,
  ],
  providers: [
    DatePipe
  ]
})
export class AlumbradoModule implements AfterViewChecked { 
  private chart: any;

  ngAfterViewChecked() {
    this.chart.render();
  }

  onInitialized(evt: any) {
    this.chart = evt.component;
  }
}
