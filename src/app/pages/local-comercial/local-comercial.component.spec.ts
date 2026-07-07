import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalComercialComponent } from './local-comercial.component';

describe('LocalComercialComponent', () => {
  let component: LocalComercialComponent;
  let fixture: ComponentFixture<LocalComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalComercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
