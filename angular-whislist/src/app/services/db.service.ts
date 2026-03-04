import Dexie, { Table } from 'dexie';
import { Injectable } from '@angular/core';

// Entidad que se persiste en IndexedDB
export interface DestinoLocal {
  id: string;
  nombre: string;
  imagenUrl: string;
  votes: number;
  servicios: string[];
}

@Injectable({ providedIn: 'root' })
export class DbService extends Dexie {
  // Tabla "destinos" con clave primaria "id"
  destinos!: Table<DestinoLocal, string>;

  constructor() {
    super('wishlistDB');
    this.version(1).stores({
      destinos: 'id, nombre'
    });
  }

  async guardarDestino(destino: DestinoLocal): Promise<void> {
    await this.destinos.put(destino);
  }

  async guardarDestinos(destinos: DestinoLocal[]): Promise<void> {
    await this.destinos.bulkPut(destinos);
  }

  async obtenerTodos(): Promise<DestinoLocal[]> {
    return this.destinos.toArray();
  }

  async eliminar(id: string): Promise<void> {
    await this.destinos.delete(id);
  }
}
