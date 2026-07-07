import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAlumbradoComponent } from './alta-alumbrado.component';

describe('AltaAlumbradoComponent', () => {
  let component: AltaAlumbradoComponent;
  let fixture: ComponentFixture<AltaAlumbradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaAlumbradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAlumbradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
