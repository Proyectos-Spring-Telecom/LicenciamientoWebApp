import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumbradoComponent } from './alumbrado.component';

describe('AlumbradoComponent', () => {
  let component: AlumbradoComponent;
  let fixture: ComponentFixture<AlumbradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumbradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumbradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
