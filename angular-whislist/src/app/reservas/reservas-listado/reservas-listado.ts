import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservasApiCliente } from '../reservas-api-cliente';

@Component({
  selector: 'app-reservas-listado',
  imports: [CommonModule, RouterLink],
  templateUrl: './reservas-listado.html',
  styleUrl: './reservas-listado.css',
})
export class ReservasListado {

  constructor(public api: ReservasApiCliente) {}

  ngOnInit(){
    
  }

}
