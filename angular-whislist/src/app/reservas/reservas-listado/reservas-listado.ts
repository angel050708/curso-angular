import { Component } from '@angular/core';
import { ReservasApiCliente } from '../reservas-api-cliente';

@Component({
  selector: 'app-reservas-listado',
  imports: [],
  templateUrl: './reservas-listado.html',
  styleUrl: './reservas-listado.css',
})
export class ReservasListado {

  constructor(private api: ReservasApiCliente) {}

  ngOnInit(){
    
  }

}
