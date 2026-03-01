import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing-module';
import { ReservasListado } from './reservas-listado/reservas-listado';
import { ReservasDetalle } from './reservas-detalle/reservas-detalle';
import { ReservasApiCliente } from './reservas-api-cliente';

@NgModule({
  imports: [
    CommonModule,
    ReservasRoutingModule,
    ReservasListado,
    ReservasDetalle
  ],
  providers: [
    ReservasApiCliente
  ]
})
export class ReservasModule { }
