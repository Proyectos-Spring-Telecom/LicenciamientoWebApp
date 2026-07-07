import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAlumbradoComponent } from './dashboard-alumbrado.component';

describe('DashboardAlumbradoComponent', () => {
  let component: DashboardAlumbradoComponent;
  let fixture: ComponentFixture<DashboardAlumbradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAlumbradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAlumbradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
