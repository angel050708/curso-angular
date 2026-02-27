import { Component, HostBinding, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje as ModeloDestinoViaje } from '../models/destino-viaje.model';
@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino-viaje.html',
  styleUrls: ['./destino-viaje.css']
})
export class DestinoViaje {
  @Input() destino!: ModeloDestinoViaje ;
  @Input('idx') position!: number;
  @HostBinding('attr.class')cssClass='col-md-4';
  @Output() clicked: EventEmitter<ModeloDestinoViaje> = new EventEmitter<ModeloDestinoViaje>();
  constructor() {
    this.clicked = new EventEmitter<ModeloDestinoViaje>();

  }

 
  Ir(){
    this.clicked.emit(this.destino);
    return false;
}
}
