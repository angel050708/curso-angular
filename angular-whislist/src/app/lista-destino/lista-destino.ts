import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViaje as ModeloDestinoViaje } from '../models/destino-viaje.model';
import { DestinosService } from '../services/destinos.service';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';


@Component({
  selector: 'app-lista-destino',
  standalone: true,
  imports: [CommonModule, DestinoViaje, FormDestinoViaje],
  templateUrl: './lista-destino.html',
  styleUrls: ['./lista-destino.css'],
})
export class ListaDestino {
  get destinos(): ModeloDestinoViaje[] {
    return this.svc.destinos;
  }
  constructor(private svc: DestinosService) {}

  agregado(d: ModeloDestinoViaje): void {
    this.svc.agregar(d.nombre, d.imagenUrl);
  }

  elegido(destino: ModeloDestinoViaje) {
    this.svc.elegir(destino);
  }
}
