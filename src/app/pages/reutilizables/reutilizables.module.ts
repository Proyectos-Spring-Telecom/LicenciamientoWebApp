import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BotonExportarTablaComponent } from './components/boton-exportar-tabla/boton-exportar-tabla.component';
import { FileUploaderCardComponent } from './components/file-uploader-card/file-uploader-card.component';

@NgModule({
	declarations: [BotonExportarTablaComponent, FileUploaderCardComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
	],
	exports: [
		BotonExportarTablaComponent,
		FileUploaderCardComponent
	],
})
export class ReutilizablesModule { }
