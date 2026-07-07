import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumbradoComponent } from './lista-alumbrado.component';

describe('ListaAlumbradoComponent', () => {
  let component: ListaAlumbradoComponent;
  let fixture: ComponentFixture<ListaAlumbradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAlumbradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlumbradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
