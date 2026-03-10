import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore, ActionReducerMap } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { StoreModule as NgRxStoreModule  } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { 
  DestinosViajesState, 
  reducerDestinosViajes, 
  DestinosViajesEffects, 
  initializeDestinosViajesState
} from './models/destinos-viajes-state.models';
import {
  TrackingState,
  reducerTracking,
  initializeTrackingState
} from './models/tracking-state.models';
import { createApiTranslateLoader } from './services/api-translate-loader';

// redux init
export interface AppState {
  destinos: DestinosViajesState;
  tracking: TrackingState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes,
  tracking: reducerTracking
};
let reducersInitialState = {
  destinos: initializeDestinosViajesState(),
  tracking: initializeTrackingState()
};
// redux fin init

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore(reducers, { initialState: reducersInitialState }),
    provideEffects([DestinosViajesEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useFactory: createApiTranslateLoader,
          deps: [HttpClient]
        }
      })
    )
  ]
};
