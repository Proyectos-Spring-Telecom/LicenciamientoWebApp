import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { PermisoService } from 'src/app/pages/permiso/services/permiso.service';
import { Modulo } from 'src/app/_entities/modulos/modulo';
import { PermisoModule } from 'src/app/_entities/permisos-module/permiso-module';
import { User } from 'src/app/_entities/User';
import Swal from 'sweetalert2';
import { AlumbradoService } from '../../service/alumbrado.service';

@Component({
  selector: 'fury-alta-alumbrado',
  templateUrl: './alta-alumbrado.component.html',
  styleUrls: ['./alta-alumbrado.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class AltaAlumbradoComponent implements OnInit {
  
  public luminariaForm: FormGroup;
  public totalPermisos: Number;
  public idLuminaria: String;
  public title: string = 'Agregar Luminarias';
  public titulo: string = 'Sistema de Alumbrado Público';
  public modulos: Modulo[];
  public noSelect: boolean = false;
  public loading: boolean = false;
  public modulo = new FormControl();
  public detalle: User;

  private _gap = 16;
  col2 = `1 1 calc(50% - ${this._gap / 2}px)`;

  constructor(
    private luminariaService: AlumbradoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    // // this.obtenerModulos();
    // this.activatedRoute.params.subscribe((params) => {
    //   this.idLuminaria = params['idLuminaria'];
    //   if (this.idLuminaria) {
    //     this.title = 'Actualizar Luminaria';
    //     this.noSelect = true;
    //     this.obtenerLuminaria();
    //   } else {
    //     this.obtenerLuminarias();
    //   }
    // });
  }

  initForm() {
    this.luminariaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idModulo: ['', Validators.required],
    });
  }

  // obtenerLuminarias() {
  //    this.luminariaService.obtenerLuminarias().subscribe((permisos) => {
  //      const ultimoPermiso = permisos[permisos.length - 1];
  //      this.luminariaService.get('nombre').setValue(ultimoPermiso.nombrePermiso + 1);
  //    });
  //  }

  // obtenerModulos() {
  //   this.permisoService.obtenerModulos().subscribe((modulos: Modulo[]) => {
  //     this.modulos = modulos;
  //   });
  // }

  // obtenerLuminaria() {
  //   this.luminariaService
  //     .obtenerPermiso(this.idLuminaria)
  //     .subscribe((permiso: PermisoModule) => {
  //       this.permisoForm.patchValue({
  //         idModulo: permiso.idModulo,
  //         nombre: permiso.nombre,
  //         descripcion: permiso.descripcion,
  //       });
  //     });
  // }

  submit() {
    if (this.idLuminaria) {
      // this.actualizar();
    } else {
      // this.agregar();
    }
  }
  
  // agregar() {
  //   this.luminariaService.agregarPermiso(this.luminariaForm.value).subscribe(
  //     (response) => {
  //       Swal.fire({
  //         title: '¡Correcto!',
  //         text: `¡Se ha gregado de manera exitosa el permiso!`,
  //         icon: 'success',
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'Confirmar',
  //       });
  //       this.regresar();
  //     },
  //     (error) => {
  //       Swal.fire({
  //         title: '¡Ops!',
  //         text: `¡Error al agregar el permiso!`,
  //         icon: 'warning',
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'Confirmar',
  //       });
  //     }
  //   );
  // }

  // actualizar() {
  //   const saveForm = {
  //     descripcion: this.permisoForm.get('descripcion').value,
  //   };
  //   this.permisoService.actualizarPermiso(saveForm, this.idPermiso).subscribe(
  //     (response) => {
  //       Swal.fire({
  //         title: '¡Correcto!',
  //         text: `¡Se ha modificado de manera exitosa el permiso!`,
  //         icon: 'success',
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'Confirmar',
  //       });
  //       this.regresar();
  //     },
  //     (error) => {
  //       Swal.fire({
  //         title: '¡Ops!',
  //         text: `¡Error al actualizar el permiso!`,
  //         icon: 'warning',
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'Confirmar',
  //       });
  //     }
  //   );
  // }

  regresar() {
    this.router.navigateByUrl('/alumbrado/lista-alumbrado');
  }
}
