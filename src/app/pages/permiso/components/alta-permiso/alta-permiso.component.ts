import { fadeInRightAnimation } from './../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from './../../../../../@fury/animations/fade-in-up.animation';
import { PermisoModule } from './../../../../_entities/permisos-module/permiso-module';
import { User } from './../../../../_entities/User';
import { Modulo } from './../../../../_entities/modulos/modulo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from './../../../auth/services/auth.service'; 
import { PermisoService } from '../../services/permiso.service';

@Component({
  selector: 'app-alta-permiso',
  templateUrl: './alta-permiso.component.html',
  styleUrls: ['./alta-permiso.component.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})

export class AltaPermisoComponent implements OnInit {
  public permisoForm: FormGroup;
  public totalPermisos: Number;
  public idPermiso: String;
  public title: string = 'Agregar Permiso';
  public titulo: string = 'Licenciamiento';
  public modulos: Modulo[];
  public noSelect: boolean = false;
  public loading: boolean = false;
  public modulo = new FormControl();
  public detalle: User;
  public mensajeModulo: string = 'Agregar Permiso'
  private _gap = 16;
  loadIndicatorVisible = false;
  buttonText = 'Guardar';
  buttonTextCancel = 'Cancelar';
  iconSuccess = true;
  col2 = `1 1 calc(50% - ${this._gap / 2}px)`;

  constructor(
    private permisoService: PermisoService,
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.obtenerModulos();
    this.obtenerDetalle();
    this.activatedRoute.params.subscribe((params) => {
      this.idPermiso = params['idPermiso'];
      if (this.idPermiso) {
        this.title = 'Actualizar Permiso';
        this.noSelect = true;
        this.obtenerPermiso();
      } else {
        this.obtenerPermisos();
      }
    });
  }
  

  initForm() {
    this.permisoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idModulo: ['', Validators.required],
    });
  }

  obtenerDetalle(){
    this.detalle = this.AuthService.getUser();
    // this.imagenLogo= this.detalle.logo.find(x=>x.logo==1)
  }

  obtenerPermisos() {
    this.permisoService.obtenerPermisos().subscribe((permisos) => {
      const ultimoPermiso = permisos[permisos.length - 1];
      this.permisoForm.get('nombre').setValue(ultimoPermiso.nombrePermiso + 1);
    });
  }

  obtenerModulos() {
    this.permisoService.obtenerModulos().subscribe((modulos: Modulo[]) => {
      this.modulos = modulos;
    });
  }

  obtenerPermiso() {
    this.permisoService.obtenerPermiso(this.idPermiso).subscribe((permiso: PermisoModule) => {
      this.permisoForm.patchValue({
        idModulo: permiso.idModulo,
        nombre: permiso.nombre,
        descripcion: permiso.descripcion,
      });
    });
  }

  submit() {
    this.loadIndicatorVisible = true;
    if (this.idPermiso) {
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
    this.permisoService.agregarPermiso(this.permisoForm.value).subscribe(
      (response) => {
        this.loading = false;
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Correcto!',
          text: `¡Se ha gregado de manera exitosa el permiso!`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      }, (error) => {
        this.loadIndicatorVisible = false;
        this.buttonText = 'Guardar';
        this.iconSuccess = true;
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Ops!',
          text: `¡Error al agregar el permiso!`,
          icon: 'warning',
          confirmButtonColor: '#C70039',
          confirmButtonText: 'Confirmar',
        });
      }
    );
  }

  actualizar() {
    const saveForm = {
      descripcion: this.permisoForm.get('descripcion').value,
    };
    this.permisoService.actualizarPermiso(saveForm, this.idPermiso).subscribe(
      (response) => {
        this.loading = false;
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Correcto!',
          text: `¡Se ha modificado de manera exitosa el permiso!`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Confirmar',
        });
        this.regresar();
      }, (error) => {
        this.loadIndicatorVisible = false;
        this.buttonText = 'Guardar';
        this.iconSuccess = true;
        Swal.fire({
          backdrop: ` rgba(19,41,61) `,
          title: '¡Ops!',
          text: `¡Error al actualizar el permiso!`,
          icon: 'warning',
          confirmButtonColor: '#C70039',
          confirmButtonText: 'Confirmar',
        });
      }
    );
  }

  regresar() {
    this.router.navigateByUrl('/permiso/lista-permiso');
  }
}
