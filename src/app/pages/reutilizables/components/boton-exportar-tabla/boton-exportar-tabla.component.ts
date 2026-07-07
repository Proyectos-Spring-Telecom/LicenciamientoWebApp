import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.ms-excel;charset=UTF-8';

@Component({
	selector: 'app-boton-exportar-tabla',
  templateUrl: './boton-exportar-tabla.component.html',
  styleUrls: ['./boton-exportar-tabla.component.css']
})
export class BotonExportarTablaComponent implements OnInit {
	@Input() tipoBoton: string;
	@Input() nombreArchivo: string;
	@Input() style: { [key: string]: string; };
	@Input() datos: any[];
	@Input() buttonDisabled: boolean;

	constructor() { }

	ngOnInit() { }

	public exportarExcel(): void {
		let hojaCalculo: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.datos);
		const libroTrabajo: XLSX.WorkBook = { Sheets: { 'data': hojaCalculo }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(libroTrabajo, { bookType: 'xlsx', type: 'array' });
		this.guardarExcel(excelBuffer, this.nombreArchivo);
	}

	private guardarExcel(buffer: any, nombreArchivo: string): void {
		const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
		FileSaver.saveAs(data, nombreArchivo + EXCEL_EXTENSION, { autoBOM: true });
	}

}
