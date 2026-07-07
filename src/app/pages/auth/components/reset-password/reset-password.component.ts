import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import Swal from 'sweetalert2';
import { AuthNoticeService } from '../../services/auth-notice-service.service';
import { AuthService } from '../../services/auth.service';
import { habilitarInputAuth } from '../../utils/auth-input.util';

@Component({
  selector: 'fury-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ResetPasswordComponent implements OnInit {
  
  forgotPasswordForm: FormGroup;
  loadIndicatorVisible = false;
	buttonText = 'Enviar';
	buttonTextSecond = 'Atrás';
	habilitarInputAuth = habilitarInputAuth;
	public loadingMessage: string = 'Cargando...';
  loading = false;
  errors: any = [];
  email: string;
  token: string;
  private unsubscribe: Subject<any>;

  inputType = 'password';
  visible = false;

  inputType1 = 'password';
  visible1 = false;

  constructor(private authService: AuthService,
    public authNoticeService: AuthNoticeService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute, ) { }

    ngOnInit() {
      this.route.queryParamMap.subscribe(queryParams => {
        this.email = queryParams.get("correo");
        this.token = queryParams.get("token").split(' ').join('+');
        //console.log(decodeURI(queryParams.get("token")));
        //console.log(queryParams.get("token").split(' ').join('+'));
      })
      this.initRegistrationForm();
    }

  send() {
    this.router.navigate(['/login']);
  }

  onClick(data) {
		this.buttonText = 'Cargando...';
		this.loadIndicatorVisible = true;
	
		setTimeout(() => {
		  this.loadingMessage = 'Cargando...'
		  this.loadIndicatorVisible = false;
		}, 2000);
	  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cdr.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cdr.markForCheck();
    }
  }

  toggleVisibilityConfirm() {
    if (this.visible1) {
      this.inputType1 = 'password';
      this.visible1 = false;
      this.cdr.markForCheck();
    } else {
      this.inputType1 = 'text';
      this.visible1 = true;
      this.cdr.markForCheck();
    }
  }

  initRegistrationForm() {
    this.forgotPasswordForm = this.fb.group({
       password: ['', Validators.compose([
         Validators.required,
       ])],
       passwordConfirmation: ['', Validators.compose([
         Validators.required
       ])],
     });
  }

  submit() {
    this.loadIndicatorVisible = true;
    this.buttonText = 'Enviando...';
    this.loading = true;
    const controls = this.forgotPasswordForm.controls;
    if (this.forgotPasswordForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    const password = controls['password'].value;
    const passwordConfirmation = controls['passwordConfirmation'].value;

    const resetPassword: any = {
      Correo: this.email,
      Token: this.token,
      Password: password,
      ConfirmPassword: passwordConfirmation,
    }

	// console.log(resetPassword);


    this.authService.resetPassword(resetPassword).
    // pipe(
    //   /*tap(response => {
    //     if (response) {
    //       this.authNoticeService.setNotice(response, 'success');
    //       this.router.navigateByUrl('/login');
    //     } else {
    //       this.authNoticeService.setNotice('error', 'danger');
    //     }
    //   }),
    //   takeUntil(this.unsubscribe),*/
    //   // finalize(() => {
    //   //   this.loading = false;
    //   //   this.cdr.markForCheck();
    //   // })
    // ).
    subscribe(
      result => {
        // console.log(result)
        this.router.navigate(['/login']).then(() => {
          Swal.fire({
            backdrop: ` rgba(19,41,61) `,
						title: '¡Correcto!',
						text: '¡Se ha actualizado de manera exitosa la contraseña!',
						icon: 'success',
						confirmButtonColor: '#008000',
						confirmButtonText: 'Continuar'
					})
        })
	    }
    );
  }

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
}
