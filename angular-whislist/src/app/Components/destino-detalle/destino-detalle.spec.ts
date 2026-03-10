import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DestinoDetalle } from './destino-detalle';
import { TrackingClickDirective } from '../../directives/tracking-click.directive';
import { reducerDestinosViajes } from '../../models/destinos-viajes-state.models';
import { reducerTracking } from '../../models/tracking-state.models';
import {
  DestinosApiClient, DestinosApiClientFake, DestinosApiClientViejo,
  APP_CONFIG, APP_CONFIG_VALUE,
} from '../../models/destinos-api-client.model';

describe('DestinoDetalle', () => {
  let component: DestinoDetalle;
  let fixture: ComponentFixture<DestinoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoDetalle],
      providers: [
        provideRouter([]),
        provideStore({ destinos: reducerDestinosViajes, tracking: reducerTracking }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(DestinoDetalle, {
      set: {
        imports: [CommonModule, RouterLink, TrackingClickDirective],
        providers: [
          { provide: DestinosApiClient, useClass: DestinosApiClientFake },
          { provide: DestinosApiClientViejo, useExisting: DestinosApiClient },
          { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
