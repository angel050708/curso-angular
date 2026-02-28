import { AppState } from '../app.config';
import { DestinoViaje } from './destino-viaje.model';
import { BehaviorSubject } from 'rxjs';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.models';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';


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
