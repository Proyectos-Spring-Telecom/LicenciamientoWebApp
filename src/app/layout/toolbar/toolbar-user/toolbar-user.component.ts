import { Component, OnInit } from '@angular/core';
import { User } from './../../../_entities/User';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { CambiarContrasenaComponent } from 'src/app/pages/auth/components/cambiar-contraseña/cambiar-contrasena.component';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpen: boolean;
  
  public detalle: User;
  


  constructor(public AuthService: AuthService,
              private dialogRef: MatDialog,
              ) { }

  ngOnInit() {
    this.obtenerDetalle();
  }

  obtenerDetalle(){
    this.detalle = this.AuthService.getUser();
    // this.imagenLogo= this.detalle.logo.find(x=>x.logo==1)
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '480px';
    dialogConfig.maxWidth = '95vw';
    dialogConfig.panelClass = 'password-dialog-panel';
    this.dialogRef.open(CambiarContrasenaComponent, dialogConfig);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

}
