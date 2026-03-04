import { Component, EventEmitter, Output, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViaje as ModeloDestinoViaje } from '../../models/destino-viaje.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinosHttpService } from '../../services/destinos-http.service';
import { AppState } from '../../app.config';
import { ElegidoFavoritoAction } from '../../models/destinos-viajes-state.models';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-lista-destino',
  standalone: true,
  imports: [CommonModule, DestinoViaje, FormDestinoViaje, TranslateModule],
  templateUrl: './lista-destino.html',
  styleUrls: ['./lista-destino.css'],
  providers: [DestinosApiClient]
})
export class ListaDestino implements OnInit {
  @Output() onItemAdded: EventEmitter<ModeloDestinoViaje> = new EventEmitter();
  updates: string[] = [];
  all: ModeloDestinoViaje[] = [];
  loading = false;
  
  private httpService = inject(DestinosHttpService);
  private store = inject(Store<AppState>);
  private destinosApiClient = inject(DestinosApiClient);
  private platformId = inject(PLATFORM_ID);

  get destinos(): ModeloDestinoViaje[] {
    return this.all;
  }

  constructor() {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    
    // Suscribirse al store para cambios en favorito
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('Se ha elegido a ' + d.nombre);
        }
      });
    
    // Suscribirse reactivamente al store
    this.store.select(state => state.destinos.items).subscribe(items => {
      this.all = items;
    });
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // 5) Cargar datos de Dexie primero (estado inicial offline)
    this.httpService.initFromDb();

    // Luego sincronizar con el API
    this.loading = true;
    this.httpService.getAll().subscribe({
      next: () => { this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  agregado(d: ModeloDestinoViaje): void {
    this.httpService.add(d).subscribe({
      next: (nuevoDestino) => { this.onItemAdded.emit(nuevoDestino); },
      error: () => {}
    });
  }

  elegido(destino: ModeloDestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(destino));
  }
}
