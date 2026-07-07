import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlumbradoComponent } from './editar-alumbrado.component';

describe('EditarAlumbradoComponent', () => {
  let component: EditarAlumbradoComponent;
  let fixture: ComponentFixture<EditarAlumbradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAlumbradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAlumbradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
