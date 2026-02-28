import { Injectable } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {
  destinos: DestinoViaje[] = [];

  agregar(nombre: string, imagenUrl: string): void {
    this.destinos.push(new DestinoViaje(nombre, imagenUrl, 0));
  }

  getDestino(idx: number): DestinoViaje | undefined {
    return this.destinos[idx - 1];
  }

  elegir(destino: DestinoViaje): void {
    this.destinos.forEach(d => d.setSelected(false));
    destino.setSelected(true);
  }
}
