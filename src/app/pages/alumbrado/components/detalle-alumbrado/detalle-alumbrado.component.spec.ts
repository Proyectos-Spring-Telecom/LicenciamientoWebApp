import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlumbradoComponent } from './detalle-alumbrado.component';

describe('DetalleAlumbradoComponent', () => {
  let component: DetalleAlumbradoComponent;
  let fixture: ComponentFixture<DetalleAlumbradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAlumbradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAlumbradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
