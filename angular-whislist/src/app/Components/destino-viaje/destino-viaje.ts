import { Component, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Espiame } from '../../espiame';
import { TrackingClickDirective } from '../../directives/tracking-click.directive';
import { DestinoViaje as ModeloDestinoViaje } from '../../models/destino-viaje.model';
import { AppState } from '../../app.config';
import { Store } from '@ngrx/store';
import { VoteUpAction, VoteDownAction } from '../../models/destinos-viajes-state.models';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule, RouterLink, Espiame, TrackingClickDirective],
  templateUrl: './destino-viaje.html',
  styleUrls: ['./destino-viaje.css'],
  animations: [
    // Animación 1: estado de la tarjeta (seleccionada o no)
    trigger('cardState', [
      state('default', style({
        transform: 'scale(1)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.16)'
      })),
      state('selected', style({
        transform: 'scale(1.05)',
        boxShadow: '0 8px 20px rgba(255, 193, 7, 0.6)',
        border: '2px solid #ffc107'
      })),
      transition('default => selected', animate('300ms ease-in')),
      transition('selected => default', animate('200ms ease-out'))
    ]),
    // Animación 2: contador de votos (entra desde abajo y sube)
    trigger('votesAnim', [
      transition(':increment', [
        style({ color: '#28a745', transform: 'translateY(8px)', opacity: 0 }),
        animate('350ms ease-out', style({ color: '#28a745', transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ color: '#dc3545', transform: 'translateY(-8px)', opacity: 0 }),
        animate('350ms ease-out', style({ color: '#dc3545', transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class DestinoViaje {
  @Input() destino!: ModeloDestinoViaje;
  @Input('idx') position!: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<ModeloDestinoViaje> = new EventEmitter<ModeloDestinoViaje>();

  constructor(private store: Store<AppState>) {}

  Ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  voteup() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }
}
