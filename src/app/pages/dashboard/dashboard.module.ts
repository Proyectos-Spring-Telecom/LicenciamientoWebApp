import { MatDividerModule } from '@angular/material/divider';
import { CommonModule,DatePipe } from '@angular/common';
import { AfterViewChecked, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import {
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
  DxPieChartModule,
  DxChartModule,
  DxValidationSummaryModule,} from 'devextreme-angular';
import { ReutilizablesModule } from '../reutilizables/reutilizables.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { QuickInfoWidgetModule } from './widgets/quick-info-widget/quick-info-widget.module';
import { LoadingOverlayModule } from 'src/@fury/shared/loading-overlay/loading-overlay.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MaterialModule,
    FurySharedModule,
    QuickInfoWidgetModule,
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
    DxValidationSummaryModule,
    DxFileUploaderModule,
    DxPieChartModule,
    DxChartModule,
    ReutilizablesModule,
    MatDividerModule,
    FuryCardModule,
    MaterialModule,
    LoadingOverlayModule
  ],
  declarations: [DashboardComponent],
  providers: [DatePipe]
})

export class DashboardModule  implements AfterViewChecked {
  private chart: any;

  ngAfterViewChecked() {
    this.chart.render();
  }

  onInitialized(evt: any) {
    this.chart = evt.component;
  }
}
