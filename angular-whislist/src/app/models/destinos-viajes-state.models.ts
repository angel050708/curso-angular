import { inject, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';

//ESTADO
export interface DestinosViajesState {
  items: DestinoViaje[];
  loading: boolean;
  favorito: DestinoViaje | null;
}

export const initializeDestinosViajesState = function(): DestinosViajesState {
  return {
    items: [],
    loading: false,
    favorito: null
  };
};

//ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down'
}

export class NuevoDestinoAction implements Action {
  readonly type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
  readonly type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
  readonly type = DestinosViajesActionTypes.VOTE_UP;
  constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
  readonly type = DestinosViajesActionTypes.VOTE_DOWN;
  constructor(public destino: DestinoViaje) {}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction;

//REDUCERS
export function reducerDestinosViajes(
  state: DestinosViajesState = initializeDestinosViajesState(),
  action: Action
): DestinosViajesState {
  switch (action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      };
    }
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
      state.items.forEach(x => x.setSelected(false));
      const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
      fav.setSelected(true);
      return {
        ...state,
        favorito: fav
      };
    }

    case DestinosViajesActionTypes.VOTE_UP: {
      const d: DestinoViaje = (action as VoteUpAction).destino;
      d.voteup();
      return {
        ...state
      };
    }

    case DestinosViajesActionTypes.VOTE_DOWN: {
      const d: DestinoViaje = (action as VoteDownAction).destino;
      d.votedown();
      return {
        ...state
      };
    }
  }
  return state;
}

//EFFECTS
@Injectable()
export class DestinosViajesEffects {
  private actions$ = inject(Actions);

  nuevoAgregado$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
      map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    )
  );
}
