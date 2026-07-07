import { UsuarioService } from './../../../usuario/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { habilitarInputAuth } from '../../utils/auth-input.util';

@Component({
	selector: 'app-cambiar-contrasena',
	templateUrl: './cambiar-contrasena.component.html',
	styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {
	public usuarioForm: FormGroup;
	public user;
	type = 'password'
	type1 = 'password'
	type2 = 'password'
	loadIndicatorVisible = false;
  	buttonText = 'Guardar';
	habilitarInputAuth = habilitarInputAuth;

	constructor(private dialogRef: MatDialogRef<CambiarContrasenaComponent>, private fb: FormBuilder,
		private authService: AuthService,
		private usuarioService: UsuarioService,) { }

	ngOnInit() {
		this.user = this.authService.getUser();
		this.initForm();
	}

	initForm() {
		const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
		this.usuarioForm = this.fb.group({
			PasswordActual: ['', [
				Validators.required,
				Validators.min(6),
				Validators.max(15),
				Validators.pattern(pattern)]],
			PasswordNuevo: ['', [
				Validators.required,
				Validators.min(6),
				Validators.max(15),
				Validators.pattern(pattern)]],
			ConfirmarPassword: ['', Validators.required]
		});
	}

	modificarDatos() {
		this.loadIndicatorVisible = true;
		this.buttonText = 'Enviando...';
		if (this.usuarioForm.get('PasswordNuevo').value === this.usuarioForm.get('ConfirmarPassword').value) {
			this.authService.changePassword(this.usuarioForm.value).pipe(
				finalize(() => {
					this.dialogRef.close();
					Swal.fire({
						backdrop: ` rgba(19,41,61) `,
						title: 'Correcto!',
						text: `¡Se ha cambiado correctamente su contraseña!`,
						icon: 'success',
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'Confirmar',
					  });
				})
			).subscribe(
				(response) => {
				}
			)
		} else {
			this.loadIndicatorVisible = false;
			this.buttonText = 'Guardar';
			Swal.fire('Las contraseñas no coincieden')
		}
	}


	myFunctionPasswordCurrent() {
		if (this.type === "password") {
		  this.type = "text";
		} else {
		  this.type = "password";
		}
	}

	myFunctionPasswordNew() {
		if (this.type1 === "password") {
		  this.type1 = "text";
		} else {
		  this.type1 = "password";
		}
	}

	myFunctionPasswordConfirm() {
		if (this.type2 === "password") {
		  this.type2 = "text";
		} else {
		  this.type2 = "password";
		}
	}

	public minimizarPopup() {
		this.dialogRef.addPanelClass('displayNone');
	}

	public maximizarPopup() {
		this.dialogRef.removePanelClass('displayNone');
	}

	public cerrarPopup() {
		this.dialogRef.close();
	}

}
