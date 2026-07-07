import { Component, OnInit, inject, ElementRef, ViewChild, enableProdMode, } from '@angular/core';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css']
})
export class MonitoreoComponent implements OnInit {
  public mensajeModulo: string = 'Monitoreo';

  constructor() {
  }

  ngOnInit(): void {
  }

}
