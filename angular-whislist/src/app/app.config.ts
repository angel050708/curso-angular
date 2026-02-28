import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore, ActionReducerMap } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreModule as NgRxStoreModule  } from '@ngrx/store';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { 
  DestinosViajesState, 
  reducerDestinosViajes, 
  DestinosViajesEffects, 
  initializeDestinosViajesState
} from './models/destinos-viajes-state.models';

// redux init
export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};
let reducersInitialState = {
  destinos: initializeDestinosViajesState()
};
// redux fin init

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideStore(reducers, { initialState: reducersInitialState }),
    provideEffects([DestinosViajesEffects])
  ]
};
