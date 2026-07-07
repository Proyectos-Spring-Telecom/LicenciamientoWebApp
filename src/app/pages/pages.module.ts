import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PagesComponent } from './pages.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AlumbradoComponent } from './alumbrado/alumbrado.component';


@NgModule({
  declarations: [
    PagesComponent,
    AlumbradoComponent,
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class PagesModule { }
