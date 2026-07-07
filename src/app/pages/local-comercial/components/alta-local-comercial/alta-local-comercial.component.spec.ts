import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaLocalComercialComponent } from './alta-local-comercial.component';

describe('AltaLocalComercialComponent', () => {
  let component: AltaLocalComercialComponent;
  let fixture: ComponentFixture<AltaLocalComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaLocalComercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaLocalComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
