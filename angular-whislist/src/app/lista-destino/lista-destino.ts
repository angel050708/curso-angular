import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViaje as ModeloDestinoViaje } from '../models/destino-viaje.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { AppState } from '../app.config';


@Component({
  selector: 'app-lista-destino',
  standalone: true,
  imports: [CommonModule, DestinoViaje, FormDestinoViaje],
  templateUrl: './lista-destino.html',
  styleUrls: ['./lista-destino.css'],
  providers: [DestinosApiClient]
})
export class ListaDestino implements OnInit {
  @Output() onItemAdded: EventEmitter<ModeloDestinoViaje> = new EventEmitter();
  updates: string[] = [];
  all: ModeloDestinoViaje[] = [];

  get destinos(): ModeloDestinoViaje[] {
    return this.destinosApiClient.getAll();
  }

  constructor(private destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('Se ha elegido a ' + d.nombre);
        }
      });
    store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  ngOnInit() {
  }

  agregado(d: ModeloDestinoViaje): void {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(destino: ModeloDestinoViaje) {
    this.destinosApiClient.elegir(destino);
  }
}
