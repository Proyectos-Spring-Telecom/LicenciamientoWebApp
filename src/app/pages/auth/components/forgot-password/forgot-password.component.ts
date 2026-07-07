import { result } from 'lodash-es';
 import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { Router, ActivatedRoute } from '@angular/router';
 import { interval, Subject, Subscription } from 'rxjs';
 import { finalize, takeUntil, tap } from 'rxjs/operators';
 import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
 import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
 import { AuthService } from '../../services/auth.service';
 import { TranslateService } from '@ngx-translate/core';
 import { AuthNoticeService } from '../../services/auth-notice-service.service';
 import Swal from 'sweetalert2';
 import { habilitarInputAuth } from '../../utils/auth-input.util';

 @Component({
   selector: 'fury-forgot-password',
   templateUrl: './forgot-password.component.html',
   styleUrls: ['./forgot-password.component.scss'],
   animations: [fadeInRightAnimation, fadeInUpAnimation]
 })
 export class ForgotPasswordComponent implements OnInit, OnDestroy {
	
	loadIndicatorVisible = false;
	buttonText = 'Enviar';
	buttonTextSecond = 'Atrás';
	habilitarInputAuth = habilitarInputAuth;

	public loadingMessage: string = 'Cargando...';
	forgotPasswordForm: FormGroup;
	loading = false;
	errors: any = [];
	segundos: number = 60;
	private subscription: Subscription;
	public disableLabel: boolean = false;
	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

   constructor(
    private authService: AuthService,
	public authNoticeService: AuthNoticeService,
	private translate: TranslateService,
	private router: Router,
	private fb: FormBuilder,
	private cdr: ChangeDetectorRef
   ) { 
	this.unsubscribe = new Subject();
   }

   ngOnInit() {
		this.initRegistrationForm();
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	onClick(data) {
		this.buttonText = 'Cargando...';
		this.loadIndicatorVisible = true;
	
		setTimeout(() => {
		  this.loadingMessage = 'Cargando...'
		  this.loadIndicatorVisible = false;
		}, 2000);
	  }

	send() {
		this.router.navigate(['/login']);
	  }

	/**
	 * Form initalization
	 */
	 initRegistrationForm() {
		this.forgotPasswordForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320)
			])
			]
		});
	}

	submit() {
		this.loadIndicatorVisible = true;
		this.buttonText = 'Enviando...';
		const controls = this.forgotPasswordForm.controls;
		/** check form */
		if (this.forgotPasswordForm.invalid) {
			this.loadIndicatorVisible = false;
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.loading = true;
		const email = controls['email'].value;
		// console.log(email)
		this.authService.requestPassword(email).
		// pipe(
		// 	tap(response => {
		// 		if (response) {
		// 			this.contador();
		// 			this.disableLabel = true;
		// 			//this.router.navigateByUrl('/login');
		// 		} else {
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.NOT_FOUND', { name: this.translate.instant('AUTH.INPUT.EMAIL') }), 'danger');
		// 		}
		// 	}),
		// 	takeUntil(this.unsubscribe),
		// 	finalize(() => {
		// 		this.loading = false;
		// 		this.cdr.markForCheck();
		// 	})
		// ).
		subscribe(
			result => {
				// console.log(result)
				this.router.navigate(['/login']).then(() => {
					Swal.fire({
						backdrop: ` rgba(19,41,61) `,
						title: '¡Correcto!',
						text: 'En breve te llegará un correo electrónico con las instrucciones para cambiar tu contraseña.',
						icon: 'success',
						confirmButtonColor: '#008000',
						confirmButtonText: 'Continuar'
					})
				})
			}, (err) =>{
				this.loadIndicatorVisible = false;
				this.buttonText = 'Enviar';
			}
		);
	}

   /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.forgotPasswordForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}

	contador() {
		this.subscription = interval(1000).subscribe(
			() => {
				this.segundos = this.segundos - 1;
					if (this.segundos == 0) {
					this.subscription.unsubscribe();
				}
			}
		);
	}
}


