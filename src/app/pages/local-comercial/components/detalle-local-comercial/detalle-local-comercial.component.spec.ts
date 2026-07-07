import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLocalComercialComponent } from './detalle-local-comercial.component';

describe('DetalleLocalComercialComponent', () => {
  let component: DetalleLocalComercialComponent;
  let fixture: ComponentFixture<DetalleLocalComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleLocalComercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleLocalComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
