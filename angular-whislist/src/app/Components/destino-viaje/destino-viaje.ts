import { Component, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DestinoViaje as ModeloDestinoViaje } from '../../models/destino-viaje.model';
import { AppState } from '../../app.config';
import { Store } from '@ngrx/store';
import { VoteUpAction, VoteDownAction } from '../../models/destinos-viajes-state.models';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destino-viaje.html',
  styleUrls: ['./destino-viaje.css']
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
