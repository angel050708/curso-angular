import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ListaDestino } from './lista-destino';
import { reducerDestinosViajes } from '../../models/destinos-viajes-state.models';
import { reducerTracking } from '../../models/tracking-state.models';

describe('ListaDestino', () => {
  let component: ListaDestino;
  let fixture: ComponentFixture<ListaDestino>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDestino],
      providers: [
        provideStore({ destinos: reducerDestinosViajes, tracking: reducerTracking }),
        provideAnimations(),
        provideHttpClient(),
        provideRouter([]),
        importProvidersFrom(TranslateModule.forRoot()),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDestino);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
