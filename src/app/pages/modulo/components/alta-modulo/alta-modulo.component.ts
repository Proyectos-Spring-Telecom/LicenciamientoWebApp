import { fadeInRightAnimation } from './../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from './../../../../../@fury/animations/fade-in-up.animation';
import { Modulo } from './../../../../_entities/modulos/modulo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloService } from '../../services/modulo.service';
import { AuthService } from './../../../auth/services/auth.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-modulo',
  templateUrl: './alta-modulo.component.html',
  styleUrls: ['./alta-modulo.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})

export class AltaModuloComponent implements OnInit {
  public moduloForm: FormGroup;
  public title = 'Agregar Módulo';
  public titulo: string = 'Licenciamiento';
  public idModulo: Number;
  public loading: boolean = false;
  private _gap = 16;
  col2 = `1 1 calc(50% - ${this._gap / 2}px)`;
  loadIndicatorVisible = false;
  buttonText = 'Guardar';
  buttonTextCancel = 'Cancelar';
  iconSuccess = true;
  
  
  constructor(
    private moduloService: ModuloService,
    private fb: FormBuilder,
    private AuthService: AuthService,
    private activatedRouted: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit() {
		this.initForm();
		this.activatedRouted.params.subscribe(
			(params) => {
				this.idModulo = params['idModulo'];
				if (this.idModulo) {
					this.title = 'Actualizar Módulo';
					this.obtenerModulo();
				}
			}
		)
	}

	initForm() {
		this.moduloForm = this.fb.group({
			Id: [''],
			Nombre: ['', Validators.required]
		})
	}
  
  obtenerModulo() {
		this.moduloService.obtenerModulo(this.idModulo).subscribe(
			(modulo: Modulo) => {
				this.moduloForm.patchValue({
					Id: modulo.id,
					Nombre: modulo.nombre
				})
			}
		);
	}

  submit() {
    this.loadIndicatorVisible = true;
		if (this.idModulo) {
      this.buttonText = 'Enviando...';
      this.loadIndicatorVisible = true;
      this.iconSuccess = false;
			this.actualizar();
		} else {
      this.buttonText = 'Enviando...';
      this.loadIndicatorVisible = true;
      this.iconSuccess = false;
			this.agregar();
		}
	}

  agregar() {
    this.moduloForm.removeControl('Id');
		this.moduloService.agregarModulo(this.moduloForm.value).subscribe(
      (response) => {
        this.loading = false;
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Correcto!',
          text: `¡Se ha agregado de manera exitosa el módulo!`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error) => {
        this.loadIndicatorVisible = false;
        this.buttonText = 'Guardar';
        this.iconSuccess = true;
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Ops!',
          text: `¡Error al agregar el módulo!`,
          icon: 'warning',
          confirmButtonColor: '#C70039',
          confirmButtonText: 'Confirmar',
        });
      }
    );
  }

  actualizar() {
    this.moduloService.actualizarModulo(this.moduloForm.value).subscribe(
      (response) => {
        this.loading = false;
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Correcto!',
          text: `¡Se ha modificado de manera exitosa el módulo!`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      },
      (error) => {
        this.loadIndicatorVisible = false;
        this.buttonText = 'Guardar';
        this.iconSuccess = true;
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Ops!',
          text: `¡Error al modificar el módulo!`,
          icon: 'warning',
          confirmButtonColor: '#C70039',
          confirmButtonText: 'Confirmar',
        });
      }
    );
  }

  regresar() {
    this.router.navigateByUrl('/modulo/lista-modulo');
  }
}
