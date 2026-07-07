import { UsuarioEdicionVM } from './../../../../_entities/usuarios/usuarioEdicionVM';
import { PermisoAgrupadoVM } from '../../../../_entities/permisos/permisoAgrupadoVM';
import { LocalComercialService } from './../../../local-comercial/services/local-comercial.service';
import { ListaRol } from './../../../../_entities/local-comercial/Catalogos/roles';
import { UsuarioVM } from '../../../../_entities/usuarios/usuarioVM';
import { fadeInAnimation } from './../../../../../@fury/animations/fade-in.animation';
import { fadeInRightAnimation } from './../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from './../../../../../@fury/animations/fade-in-up.animation';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { ListaGrupo } from 'src/app/_entities/local-comercial/Catalogos/grupo';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation, fadeInAnimation]
})

export class AltaUsuarioComponent implements OnInit {
	public usuarioForm: FormGroup;
	public usuario: UsuarioVM[];
	public modulosPermisos: PermisoAgrupadoVM[];
	public roles: ListaRol[];
	public grupos: ListaGrupo[];
	public idUsuario: string;
	public idUsuarioMod: string;
	public titulo: string = 'Agregar Usuarios';
	public id: any;
	private _gap = 16;
	public readonly: boolean = false;
	public loading: boolean = false;
	public param: Subscription;
	public permisosActuales: string[] = [];
	public title: string = 'Licenciamiento'
	public tiempoEspera: number = 1000;
	col2 = `1 1 calc(50% - ${this._gap / 2}px)`;
	type = 'password'
	types = 'password'
	loadIndicatorVisible = false;
	buttonText = 'Guardar';
	buttonTextCancel = 'Cancelar';
	iconSuccess = true;
	public loadingMessage: string = 'Cargando...';
	loadingVisible = false;
	showPwdHints = false;

	readonly passwordRuleDefs = [
		{ key: 'case', label: 'Al menos una mayúscula y minúsculas.' },
		{ key: 'special', label: 'Un caracter no alfanumérico (ejemplo: #?!&).' },
		{ key: 'number', label: 'Un número.' },
		{ key: 'length', label: 'La contraseña debe tener más de 6 caracteres y menos de 16.' },
	];

  	public mensajes = {
		nombre: '',
		apellidoPaterno: '',
		apellidoMaterno: '',
		correo: '',
		password: '',
		confirmPassword: '',
		permisos: ''
	};

  	constructor(private router:Router,
              private authService: AuthService,
              private usuarioService: UsuarioService,
              private localComercialService: LocalComercialService,
              private fb: FormBuilder,
              private route: ActivatedRoute,) { }

  	ngOnInit() {
    	this.initForm();
    	this.param = this.route.params.subscribe(
      	params => {
			this.idUsuario = params['idUsuario'];
			if (this.idUsuario) {
				this.loadingVisible = true;
				this.loadingMessage = 'Cargando...';
				this.titulo = 'Editar Usuario';
				this.obtenerUsuario(this.idUsuario);
			}
		});
		this.obtenerPermisos();
		this.obtenerRoles();
		this.obtenerGrupo();
  	}

	onShown() {
		setTimeout(() => {
			this.loadingVisible = false;
		}, 2000);
  	}

  	ngOnDestroy(): void {
		this.param.unsubscribe();
	}

	obtenerUsuario(idUsuario: string) {
		this.loadingMessage = 'Cargando...';
		this.usuarioService.obtenerUsuario(idUsuario).subscribe(
			res => this.displayUsuario(res),
			err => Swal.fire('Ocurrió un error al intentar obtener el usuario', 'Error en la Operación')
		);
	}

	obtenerPermisos() {
		this.loadingMessage = 'Cargando...';
		this.usuarioService.obtenerPermisosAgrupados().subscribe(
			res => {
				 res.forEach(modulo => {
				 	 if (modulo.nombre === 'Mapa') {
				 		modulo.permisos = modulo.permisos.sort(function (a, b) {
				 			if (a.descripcion > b.descripcion) {
				 				return 1;
				 			}
				 			if (a.descripcion < b.descripcion) {
				 				return -1;
				 			}
				 			return 0;
				 		});
					 }
				 })
				this.modulosPermisos = res;

			}, err => 
			Swal.fire({
				backdrop: ` rgba(19,41,61) `,
				title: '¡Error en la Operación!',
				text: `¡Ocurrió un error al intentar obtener los permisos!`,
				icon: 'error',
			})
		);
	}

	clearAutofillOnFocus(event: FocusEvent): void {
		const input = event.target as HTMLInputElement;
		input.removeAttribute('readonly');
	}

	onPasswordFocus(event: FocusEvent): void {
		this.clearAutofillOnFocus(event);
		this.showPwdHints = true;
	}

	onPasswordInput(): void {
		this.showPwdHints = true;
	}

	get currentPasswordRuleKey(): string {
		const password = this.usuarioForm?.get('password')?.value ?? '';
		if (!password) {
			return this.passwordRuleDefs[0].key;
		}

		const pending = this.passwordRuleDefs.find((rule) => !this.checkPasswordRule(rule.key, password));
		return pending ? pending.key : 'ok';
	}

	get passwordIsValid(): boolean {
		return this.currentPasswordRuleKey === 'ok';
	}

	get confirmPasswordMismatch(): boolean {
		const confirmControl = this.usuarioForm?.get('confirmPassword');
		return !!(confirmControl?.value && confirmControl.hasError('mismatch'));
	}

	private checkPasswordRule(key: string, password: string): boolean {
		switch (key) {
			case 'case':
				return /[A-Z]/.test(password) && /[a-z]/.test(password);
			case 'special':
				return /[^a-zA-Z0-9]/.test(password);
			case 'number':
				return /\d/.test(password);
			case 'length':
				return password.length > 6 && password.length < 16;
			default:
				return false;
		}
	}

	private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
		const value = control.value ?? '';
		if (!value) {
			return null;
		}

		const errors: ValidationErrors = {};
		this.passwordRuleDefs.forEach((rule) => {
			if (!this.checkPasswordRule(rule.key, value)) {
				errors[rule.key] = true;
			}
		});

		return Object.keys(errors).length ? errors : null;
	}

	private confirmPasswordMatchValidator(control: AbstractControl): ValidationErrors | null {
		if (!control.parent) {
			return null;
		}

		const password = control.parent.get('password')?.value;
		const confirm = control.value;

		if (!confirm) {
			return null;
		}

		return password === confirm ? null : { mismatch: true };
	}

	myFunctionPasswordCurrent() {
		if (this.type === "password") {
		  this.type = "text";
		} else {
		  this.type = "password";
		}
	}

	myFunctionPasswordNew() {
		if (this.types === "password") {
		  this.types = "text";
		} else {
		  this.types = "password";
		}
	}

	ordenarAsc(permisos) {
	}

  	initForm() {
		this.usuarioForm = this.fb.group({
			nombre: ['', [Validators.required, Validators.maxLength(200)]],
			apellidoPaterno: ['', [Validators.maxLength(200)]],
			apellidoMaterno: ['', [Validators.maxLength(200)]],
			correo: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, this.passwordStrengthValidator.bind(this)]],
			confirmPassword: ['', [Validators.required, this.confirmPasswordMatchValidator.bind(this)]],
			permisos: [''],
			idRol: ['', [Validators.required]],
			idGrupo: ['', [Validators.required]]
		});
		this.initFormValidation();
 	}
  
	initFormValidation() {
		const nombreControl = this.usuarioForm.get('nombre');
		const apellidoPaternoControl = this.usuarioForm.get('apellidoPaterno');
		const apellidoMaternoControl = this.usuarioForm.get('apellidoMaterno');
		const correoControl = this.usuarioForm.get('correo');
		const passwordControl = this.usuarioForm.get('password');
		const confirmPasswordControl = this.usuarioForm.get('confirmPassword');
		const permisosControl = this.usuarioForm.get('permisos');
		const idRol = this.usuarioForm.get('idRol');
		const idGrupo = this.usuarioForm.get('idGrupo');

		nombreControl.valueChanges.pipe(
			debounceTime(this.tiempoEspera)
		).subscribe(
			value => this.setMessage(nombreControl, 'nombre', 'Nombre')
		);
		apellidoPaternoControl.valueChanges.pipe(
			debounceTime(this.tiempoEspera)
		).subscribe(
			value => this.setMessage(apellidoPaternoControl, 'apellidoPaterno', 'Apellido Paterno')
		);
		apellidoMaternoControl.valueChanges.pipe(
			debounceTime(this.tiempoEspera)
		).subscribe(
			value => this.setMessage(apellidoMaternoControl, 'apellidoMaterno', 'Apellido Materno')
		);
		if (!this.idUsuario) {
			correoControl.valueChanges.pipe(
				debounceTime(this.tiempoEspera)
			).subscribe(
				value => this.setMessage(correoControl, 'correo', 'Correo')
			);
			passwordControl.valueChanges.pipe(
				debounceTime(this.tiempoEspera)
			).subscribe(() => {
				this.setMessage(passwordControl, 'password', 'Contraseña');
				confirmPasswordControl.updateValueAndValidity({ emitEvent: false });
			});
			confirmPasswordControl.valueChanges.pipe(
				debounceTime(this.tiempoEspera)
			).subscribe(
				value => this.setMessage(confirmPasswordControl, 'confirmPassword', 'Confirmación Contraseña')
			);
		}
		permisosControl.valueChanges.pipe(
			debounceTime(this.tiempoEspera)
		).subscribe(
			value => this.setMessage(permisosControl, 'permisos', 'Permisos')
		);
		if (this.idUsuario) {
			idRol.valueChanges.pipe(
				debounceTime(this.tiempoEspera)
			).subscribe(
				value => this.setMessage(idRol, 'idRol', 'Rol')
			);
		}
		if (this.idUsuario) {
			idGrupo.valueChanges.pipe(
				debounceTime(this.tiempoEspera)
			).subscribe(
				value => this.setMessage(idGrupo, 'idGrupo', 'Grupo')
			);
		}
	}

	setMessage(c: AbstractControl, campo: string, campoVisual: string): void {
		this.mensajes[campo] = '';
		if ((c.touched || c.dirty) && c.errors) {
			this.mensajes[campo] = Object.keys(c.errors).map(
				key => this.generateMessage(c, key, campoVisual)
			).join(' ');
		}
	}

	generateMessage(c: AbstractControl, key: string, campoVisual: string): string {
		switch (key) {
			case 'required':
				return `El campo ${campoVisual} es requerido`;
			case 'match':
			case 'mismatch':
				return 'Las contraseñas no coinciden';
			case 'email':
				return 'Ingrese un correo válido';
			case 'minlength':
				return `El campo ${campoVisual} tiene una longitud mínima de ${c.errors[key].requiredLength} caracteres`;
			case 'maxlength':
				return `El campo ${campoVisual} tiene una longitud máxima de ${c.errors[key].requiredLength} caracteres`;
			case 'pattern':
				return 'La contraseña debe ser de 6 o más caracteres y contener mayúsculas y minúsculas, por lo menos un número y un símbolo'
			default:
				return `El campo ${campoVisual} es inválido`;
		}
	}

	displayUsuario(usuario: UsuarioEdicionVM) {
		this.permisosActuales = usuario.permisos;
		this.usuarioForm = this.fb.group({
			nombre: [usuario.nombre, [Validators.required, Validators.maxLength(200)]],
			apellidoPaterno: [usuario.apellidoPaterno, [Validators.maxLength(200)]],
			apellidoMaterno: [usuario.apellidoMaterno, [Validators.maxLength(200)]],
			permisos: [usuario.permisos, [Validators.required]],
			idRol: [usuario.idRol, [Validators.required]],
			idGrupo: [usuario.idGrupo, [Validators.required]]
		});
		this.initFormValidation();
	}

	redirigir(){
    	this.router.navigateByUrl('/usuario/lista-usuario');
    }

	onSubmit() {
		this.loading = true;
		if (this.idUsuario) {
			this.buttonText = 'Enviando...';
			this.loadIndicatorVisible = true;
			this.iconSuccess = false;
			this.loading = true;
			this.actualizarUsuario();
		} else {
			this.buttonText = 'Enviando...';
			this.loadIndicatorVisible = true;
			this.iconSuccess = false;
			this.registrarUsuario();
			this.loading = true;
		}
	}
	
	registrarUsuario() {
		var usuario = { ...this.usuarioForm.value };
		this.authService.register(usuario).subscribe(success => {
			this.usuarioForm.reset();
			Swal.fire({
				backdrop: ` rgba(19,41,61) `,
				title: '¡Operación exitosa!',
				text: `¡Se ha agregado de manera exitosa el usuario!`,
				icon: 'success',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Confirmar',
			  });
			  this.redirigir();
		},	err => {
			this.loadIndicatorVisible = false;
			this.buttonText = 'Guardar';
			this.iconSuccess = true;
				Swal.fire({
					backdrop: ` rgba(19,41,61) `,
					title: '¡Ops!',
					text: `¡Error al agregar el usuario!`,
					icon: 'warning',
					confirmButtonColor: '#C70039',
					confirmButtonText: 'Confirmar',
				  });
				this.loading = false;
			}, () => this.onSubmitComplete());
	}

	actualizarUsuario() {
		var usuario = { ...this.usuarioForm.value };
		this.usuarioService.actualizarUsuario(this.idUsuario, usuario).subscribe(success => {
			Swal.fire({
				backdrop: ` rgba(19,41,61) `,
				title: '¡Operación exitosa!',
				text: `¡Se ha modificado de manera exitosa el usuario!`,
				icon: 'success',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Confirmar',
			  });
			  this.redirigir();
		},
			err => {
				this.loadIndicatorVisible = false;
				this.buttonText = 'Guardar';
				this.iconSuccess = true;
				Swal.fire({
					backdrop: ` rgba(19,41,61) `,
					title: '¡Ops!',
					text: `¡Error al actualizar el usuario!`,
					icon: 'warning',
					confirmButtonColor: '#C70039',
					confirmButtonText: 'Confirmar',
				  });
				this.loading = false;
			},
			() => this.onSubmitComplete());
	}

	onSubmitComplete() {
		this.loading = false;
	}

	changeValue(checked, permiso) {
		if (checked) {
			if (!this.permisosActuales.includes(permiso.nombre)) {
				this.permisosActuales.push(permiso.nombre);
			}
		} else {
			const index = this.permisosActuales.indexOf(permiso.nombre);
			if (index > -1) {
				this.permisosActuales.splice(index, 1);
			}
		}
		this.usuarioForm.patchValue({
			permisos: [...this.permisosActuales]
		});
	}

	checkedBox(permiso) {
		const permisos: string[] = this.usuarioForm.get('permisos').value || [];
		return permisos.includes(permiso.nombre);
	}

	isModuloFullyChecked(modulo: PermisoAgrupadoVM): boolean {
		if (!modulo?.permisos?.length) {
			return false;
		}
		return modulo.permisos.every(permiso => this.checkedBox(permiso));
	}

	toggleModulo(modulo: PermisoAgrupadoVM, event: Event): void {
		const checked = (event.target as HTMLInputElement).checked;
		modulo.permisos.forEach(permiso => this.changeValue(checked, permiso));
	}


	/**Pasar el valor del mat-slide de boolean a number */
	public checado: boolean = false;
	onChange(value, permiso) {
		if (value.checked === true) {
			this.permisosActuales.push(permiso);
		} else {
			this.permisosActuales.splice(this.permisosActuales.findIndex(item => item === permiso), 1)
		}

		this.usuarioForm.patchValue({
			permisos: this.permisosActuales
		})
	}


  	/*Obtener Catalogos */
  	obtenerRoles() {
		this.localComercialService.obtenerRoles().subscribe(
			(rol: ListaRol[]) => {
				this.roles = rol;
			},
		);
	}

  	obtenerGrupo() {
		this.localComercialService.obtenerGrupos().subscribe(
			(response: ListaGrupo[]) => {
			this.grupos = response;
		});
	}
 /*Fin de Catalogos */ 
}