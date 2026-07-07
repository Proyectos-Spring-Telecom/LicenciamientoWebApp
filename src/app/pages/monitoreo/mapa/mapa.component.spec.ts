import { TestBed } from '@angular/core/testing';
import { MapaComponent } from './mapa.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MapaComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MapaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'google-maps'`, () => {
    const fixture = TestBed.createComponent(MapaComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('google-maps');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MapaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('google-maps app is running!');
  });
});
