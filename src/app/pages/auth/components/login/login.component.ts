import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { routeAnimation } from 'src/@fury/animations/route.animation';
import { habilitarInputAuth } from '../../utils/auth-input.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, routeAnimation]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  loading = false;
  textLogin = 'iniciar sesión';
  habilitarInputAuth = habilitarInputAuth;

  get isDisabled(): boolean {
    return this.loading;
  }

  constructor(private fb: FormBuilder, private router: Router,
    private auth: AuthService) { }

  type = 'password'
  swanit = ''


  ngOnInit(): void {
    this.initForm();
    this.logout();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  /**
   * Inicio Sesión
   */
  submit() {
    this.loading = true;
    this.textLogin = 'cargando...';
    this.auth.authenticate(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.textLogin = 'iniciar sesión';
        })
      )
      .subscribe(
        result => {
          this.auth.setData(result);
          this.myAnimation();
          this.router.navigate(['/dashboard']).then(() => {
            Swal.fire({
              backdrop: ` rgba(19,41,61) `,
              title: '¡Bienvenido!',
              text: 'Sistema de Gestión de Usuarios SAPAC y Padrón de Licencias de Funcionamiento de Establecimientos Comerciales, Industriales y de Servicios.',
              icon: 'success',
              confirmButtonColor: '#008000',
              confirmButtonText: 'Continuar'
            })
          });
        }, error => {
          Swal.fire({
            backdrop: ` rgba(19,41,61) `,
            title: '¡Credenciales incorrectas!',
            text: 'Por favor verifica que los datos sean correctos para iniciar sesión',
            icon: 'error',
            confirmButtonColor: '#C70039',
            confirmButtonText: 'Aceptar'
          })
        });
  }

  myFunction() {
    if (this.type === "password") {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  myAnimation() {
    this.swanit = "showanimation"
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
