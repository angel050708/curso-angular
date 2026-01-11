import { Component } from '@angular/core';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  templateUrl: './destino-viaje.html',
  styleUrls: ['./destino-viaje.css']
})
export class DestinoViaje {
  nombre: string ;
  constructor() {
    this.nombre = 'Barcelona';
  }
}
