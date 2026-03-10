import { Directive, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import { TrackClickAction } from '../models/tracking-state.models';

/**
 * Directiva custom para rastrear clics del usuario.
 *
 * Uso:
 *   <button appTrackingClick data-tracking-tag="boton-favorito">Ir!</button>
 *
 * La directiva:
 *  1. Inyecta ElementRef para acceder al elemento nativo del DOM.
 *  2. Se suscribe de forma reactiva (fromEvent) al evento 'click'.
 *  3. Lee el atributo `data-tracking-tag` del elemento para identificar el clic.
 *  4. Despacha una acción Redux (TrackClickAction) para actualizar la cuenta.
 */
@Directive({
  selector: '[appTrackingClick]',
  standalone: true
})
export class TrackingClickDirective implements OnInit, OnDestroy {

  private el = inject(ElementRef);
  private store = inject(Store);
  private clickSub!: Subscription;

  ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement;

    // Suscripción reactiva al evento click del elemento del DOM
    this.clickSub = fromEvent(nativeElement, 'click').subscribe(() => {
      // Leer el tracking tag del atributo data del elemento
      const tag = nativeElement.getAttribute('data-tracking-tag') || 'sin-tag';
      console.log(`[TrackingClick] Click detectado → tag: "${tag}"`);
      this.store.dispatch(new TrackClickAction(tag));
    });
  }

  ngOnDestroy(): void {
    // Limpieza de la suscripción al destruir la directiva
    if (this.clickSub) {
      this.clickSub.unsubscribe();
    }
  }
}
