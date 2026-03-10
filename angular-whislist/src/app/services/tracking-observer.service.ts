import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, pairwise, skip } from 'rxjs/operators';
import { AppState } from '../app.config';
import { TrackingState } from '../models/tracking-state.models';

/**
 * Servicio que observa el store de Redux (NgRx) y, ante cambios
 * en la cuenta de tracking tags, loguea por consola y opcionalmente
 * podría notificar a un servidor.
 *
 * Se provee a nivel raíz (providedIn: 'root') para que se instancie
 * una sola vez como singleton al arrancar la aplicación.
 */
@Injectable({ providedIn: 'root' })
export class TrackingObserverService {
  private store = inject(Store<AppState>);

  /**
   * Inicializa la suscripción al slice de tracking del store.
   * Debe llamarse una vez al arrancar la app (por ejemplo, en APP_INITIALIZER
   * o en el constructor del componente raíz).
   */
  init(): void {
    this.store
      .select((state) => state.tracking)
      .pipe(
        // Solo emitir cuando realmente cambien los tags
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev.tags) === JSON.stringify(curr.tags)
        ),
        // Ignorar el estado inicial vacío
        skip(1)
      )
      .subscribe((trackingState: TrackingState) => {
        console.log(
          '%c[TrackingObserver] 📊 Cambio en tracking tags detectado:',
          'color: #4CAF50; font-weight: bold'
        );
        console.table(
          Object.entries(trackingState.tags).map(([tag, count]) => ({
            Tag: tag,
            Clics: count
          }))
        );

        // ── Opcional: notificar a un servidor ──
        // this.enviarAlServidor(trackingState.tags);
      });

    console.log(
      '%c[TrackingObserver] ✅ Servicio de tracking inicializado',
      'color: #2196F3; font-weight: bold'
    );
  }

  /**
   * (Opcional) Envía los datos de tracking a un endpoint del backend.
   * Descomenta y ajusta la URL según tu API.
   */
  // private http = inject(HttpClient);
  // private enviarAlServidor(tags: { [tag: string]: number }): void {
  //   this.http.post('http://localhost:3000/api/tracking', { tags, timestamp: new Date().toISOString() })
  //     .subscribe({
  //       next: () => console.log('[TrackingObserver] Datos enviados al servidor'),
  //       error: (err) => console.warn('[TrackingObserver] Error enviando al servidor:', err)
  //     });
  // }
}
