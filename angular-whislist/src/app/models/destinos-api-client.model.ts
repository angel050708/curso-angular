import { AppState } from '../app.config';
import { DestinoViaje } from './destino-viaje.model';
import { BehaviorSubject } from 'rxjs';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.models';
import { Store } from '@ngrx/store';
import { Injectable, InjectionToken } from '@angular/core';

// ─── InjectionToken ───────────────────────────────────────────────────────────
export interface AppConfig {
  apiEndpoint: string;
}

export const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// ─── useExisting: clase "vieja" para alias ────────────────────────────────────
export class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamando por la clase vieja!');
    return null!;
  }
}

// ─── useClass: implementación alternativa (sin dependencia de Store) ──────────
@Injectable()
export class DestinosApiClientFake {
  private destinos: DestinoViaje[] = [
    new DestinoViaje('Destino Fake 1', 'https://picsum.photos/seed/fake1/400/300', 10),
    new DestinoViaje('Destino Fake 2', 'https://picsum.photos/seed/fake2/400/300', 5),
  ];

  add(d: DestinoViaje): void { this.destinos.push(d); }

  getAll(): DestinoViaje[] { return this.destinos; }

  getById(id: string): DestinoViaje {
    return this.destinos.find(d => d.id === id) ?? this.destinos[0];
  }

  elegir(d: DestinoViaje): void {
    console.log('[Fake] elegido:', d.nombre);
  }

  subscribeOnChange(_fn: (d: DestinoViaje) => void): void {}
}


@Injectable()
export class DestinosApiClient {
  private destinos: DestinoViaje[] = [];
  private current: BehaviorSubject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null!);

  constructor(private store: Store<AppState>) {}

  add(d: DestinoViaje) {
    this.store.dispatch(new NuevoDestinoAction(d));
    this.destinos.push(d);
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  getById(id: string): DestinoViaje {
    return this.destinos.filter(function(d) { return d.id.toString() == id; })[0];
  }

  elegir(d: DestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
    
  }

  subscribeOnChange(fn: (d: DestinoViaje) => void) {
    this.current.subscribe(fn);
  }
}
