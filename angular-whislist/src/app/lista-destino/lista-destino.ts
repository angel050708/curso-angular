import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViaje as ModeloDestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destino',
  standalone: true,
  imports: [CommonModule, DestinoViaje],
  templateUrl: './lista-destino.html',
  styleUrls: ['./lista-destino.css'],
})
export class ListaDestino {
  destinos: ModeloDestinoViaje[];
  constructor() {
    this.destinos = [];
  }


  guardar(nombre: string, url: string):boolean {
    this.destinos.push(new ModeloDestinoViaje(nombre, url));
    
    
    return false;
  }


}
