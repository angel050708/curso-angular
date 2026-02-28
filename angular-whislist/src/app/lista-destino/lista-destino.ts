import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViaje as ModeloDestinoViaje } from '../models/destino-viaje.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { AppState } from '../app.config';
import { ElegidoFavoritoAction } from '../models/destinos-viajes-state.models';


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
  updates: string[] 

  get destinos(): ModeloDestinoViaje[] {
    return this.destinosApiClient.getAll();
  }

  constructor(private destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
    .subscribe(data => {
      if(data != null){
        this.updates.push('Se ha elegido '+ data.nombre);
      }
    });
    this.destinosApiClient.subscribeOnChange((d: ModeloDestinoViaje) => {
    });
  }
      

  ngOnInit() {
  }

  agregado(d: ModeloDestinoViaje): void {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

  elegido(destino: ModeloDestinoViaje) {
    this.destinosApiClient.elegir(destino);
    this.store.dispatch(new ElegidoFavoritoAction(destino));
  }
}
