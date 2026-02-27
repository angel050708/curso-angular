import { RouterModule, Routes } from '@angular/router';
import { ListaDestino } from './lista-destino/lista-destino';
import { DestinoDetalle } from './destino-detalle/destino-detalle';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestino },
  { path: 'destino/:id', component: DestinoDetalle }
];
