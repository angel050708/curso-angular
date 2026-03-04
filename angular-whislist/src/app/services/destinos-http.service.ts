import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, tap, map } from 'rxjs';
import { DestinoViaje } from '../models/destino-viaje.model';
import { AppState } from '../app.config';
import { NuevoDestinoAction, DestinosLoadedAction, InitDestinosFromDbAction } from '../models/destinos-viajes-state.models';
import Dexie, { Table } from 'dexie';
import { DbService } from './db.service';

export interface DestinoApi {
  id: string;
  nombre: string;
  imagenUrl: string;
  votes: number;
  servicios: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DestinosHttpService {
  private http = inject(HttpClient);
  private store = inject(Store<AppState>);
  private db = inject(DbService);  // Inyección de dependencias de Dexie
  private apiUrl = '/api/destinos';

  // 5) Al iniciar la app, carga datos de Dexie y notifica a Redux con action nuevo
  async initFromDb(): Promise<void> {
    const locales = await this.db.obtenerTodos();
    if (locales.length > 0) {
      const destinos = locales.map(item => this.mapToDestinoViaje(item));
      this.store.dispatch(new InitDestinosFromDbAction(destinos));
    }
  }

  getAll(): Observable<DestinoViaje[]> {
    return this.http.get<DestinoApi[]>(this.apiUrl).pipe(
      map(items => items.map(item => this.mapToDestinoViaje(item))),
      tap(destinos => {
        this.store.dispatch(new DestinosLoadedAction(destinos));
      })
    );
  }

  getById(id: string): Observable<DestinoViaje> {
    return this.http.get<DestinoApi>(`${this.apiUrl}/${id}`).pipe(
      map(item => this.mapToDestinoViaje(item))
    );
  }

  add(destino: DestinoViaje): Observable<DestinoViaje> {
    const body = {
      nombre: destino.nombre,
      imagenUrl: destino.imagenUrl,
      votes: destino.votes,
      servicios: destino.servicios
    };

    return this.http.post<DestinoApi>(this.apiUrl, body).pipe(
      map(item => this.mapToDestinoViaje(item)),
      tap(async nuevoDestino => {
        // 4) API exitoso → guardar también en Dexie de forma asíncrona
        await this.db.guardarDestino({
          id: nuevoDestino.id,
          nombre: nuevoDestino.nombre,
          imagenUrl: nuevoDestino.imagenUrl,
          votes: nuevoDestino.votes,
          servicios: nuevoDestino.servicios
        });
        this.store.dispatch(new NuevoDestinoAction(nuevoDestino));
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(async () => await this.db.eliminar(id))
    );
  }

  private mapToDestinoViaje(item: DestinoApi): DestinoViaje {
    const destino = new DestinoViaje(item.nombre, item.imagenUrl, item.votes);
    destino.id = item.id;
    destino.servicios = item.servicios;
    return destino;
  }
}
