import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private permissionsService: NgxPermissionsService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.loadRolesWithPermissions();
  }

  loadRolesWithPermissions() {
		console.log({ 'Permisos Actuales': this.permissionsService.getPermissions() });
		this.permissionsService.flushPermissions();
		const permissions = this.authService.getPermissions();
		// console.log({ permissions });
		this.permissionsService.loadPermissions(permissions);

	}

}
