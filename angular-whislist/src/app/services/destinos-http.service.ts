import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, tap, map } from 'rxjs';
import { DestinoViaje } from '../models/destino-viaje.model';
import { AppState } from '../app.config';
import { NuevoDestinoAction, DestinosLoadedAction } from '../models/destinos-viajes-state.models';

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
  // Ruta relativa - Angular proxy redirige /api/* a http://localhost:3001
  private apiUrl = '/api/destinos';

  /**
   * Obtiene todos los destinos desde el API y notifica a Redux
   */
  getAll(): Observable<DestinoViaje[]> {
    return this.http.get<DestinoApi[]>(this.apiUrl).pipe(
      map(items => items.map(item => this.mapToDestinoViaje(item))),
      tap(destinos => {
        this.store.dispatch(new DestinosLoadedAction(destinos));
      })
    );
  }

  /**
   * Obtiene un destino por ID desde el API
   */
  getById(id: string): Observable<DestinoViaje> {
    return this.http.get<DestinoApi>(`${this.apiUrl}/${id}`).pipe(
      map(item => this.mapToDestinoViaje(item))
    );
  }

  /**
   * Agrega un nuevo destino via API y notifica a Redux con action
   */
  add(destino: DestinoViaje): Observable<DestinoViaje> {
    const body = {
      nombre: destino.nombre,
      imagenUrl: destino.imagenUrl,
      votes: destino.votes,
      servicios: destino.servicios
    };

    return this.http.post<DestinoApi>(this.apiUrl, body).pipe(
      map(item => this.mapToDestinoViaje(item)),
      tap(nuevoDestino => {
        this.store.dispatch(new NuevoDestinoAction(nuevoDestino));
      })
    );
  }

  /**
   * Elimina un destino via API
   */
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Mapea la respuesta del API al modelo DestinoViaje
   */
  private mapToDestinoViaje(item: DestinoApi): DestinoViaje {
    const destino = new DestinoViaje(item.nombre, item.imagenUrl, item.votes);
    destino.id = item.id;
    destino.servicios = item.servicios;
    return destino;
  }
}
