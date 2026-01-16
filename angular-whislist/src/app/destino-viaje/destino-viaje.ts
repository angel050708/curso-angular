import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DestinoViaje as ModeloDestinoViaje } from '../models/destino-viaje.model';
@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  templateUrl: './destino-viaje.html',
  styleUrls: ['./destino-viaje.css']
})
export class DestinoViaje {
  @Input() destino!: ModeloDestinoViaje ;
  @HostBinding('attr.class')cssClass='col-md-4';
  constructor() {
  }
}
