import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViaje as ModeloDestinoViaje } from '../models/destino-viaje.model';
import { DestinosService } from '../services/destinos.service';


@Component({
  selector: 'app-lista-destino',
  standalone: true,
  imports: [CommonModule, DestinoViaje],
  templateUrl: './lista-destino.html',
  styleUrls: ['./lista-destino.css'],
})
export class ListaDestino {
  get destinos(): ModeloDestinoViaje[] {
    return this.svc.destinos;
  }
  constructor(private svc: DestinosService) {}

  guardar(nombre: string, url: string): boolean {
    this.svc.agregar(nombre, url);
    return false;
  }

  elegido(destino: ModeloDestinoViaje) {
    this.svc.elegir(destino);
  }
}
