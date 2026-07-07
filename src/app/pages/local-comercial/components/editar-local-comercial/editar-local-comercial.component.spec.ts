import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLocalComercialComponent } from './editar-local-comercial.component';

describe('EditarLocalComercialComponent', () => {
  let component: EditarLocalComercialComponent;
  let fixture: ComponentFixture<EditarLocalComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLocalComercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLocalComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
