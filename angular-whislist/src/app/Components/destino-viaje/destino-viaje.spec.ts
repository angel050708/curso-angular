import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DestinoViaje } from './destino-viaje';
import { DestinoViaje as ModeloDestinoViaje } from '../../models/destino-viaje.model';
import { reducerDestinosViajes } from '../../models/destinos-viajes-state.models';
import { reducerTracking } from '../../models/tracking-state.models';

describe('DestinoViaje', () => {
  let component: DestinoViaje;
  let fixture: ComponentFixture<DestinoViaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoViaje],
      providers: [
        provideStore({ destinos: reducerDestinosViajes, tracking: reducerTracking }),
        provideAnimations(),
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinoViaje);
    component = fixture.componentInstance;
    component.destino = new ModeloDestinoViaje('Test', 'http://test.com', 0);
    component.position = 0;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
