import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fury-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public titulo : string = 'Inicio';

  @Input() current: string;
  @Input() link: string;
  @Input() crumbs: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
