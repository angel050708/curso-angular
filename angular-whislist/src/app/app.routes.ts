import { RouterModule, Routes } from '@angular/router';
import { ListaDestino } from './Components/lista-destino/lista-destino';
import { DestinoDetalle } from './Components/destino-detalle/destino-detalle';
import { Login } from './Components/login/login/login';
import { Protected } from './Components/protected/protected/protected';
import { usuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado-guard';
import { VuelosComponent } from './Components/vuelos/vuelos-component/vuelos-component';
import { VuelosMainComponent } from './Components/vuelos/vuelos-main-component/vuelos-main-component';
import { VuelosMasInfoComponent } from './Components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component';
import { VuelosDetalleComponent } from './Components/vuelos/vuelos-detalle-component/vuelos-detalle-component';
import path from 'path/win32';

export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponent },
  { path: 'mas-info', component: VuelosMasInfoComponent },
  { path: ':id', component: VuelosDetalleComponent }
];

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestino },
  { path: 'destino', component: ListaDestino },
  { path: 'destino/:id', component: DestinoDetalle },
  { path: 'login', component: Login },
  {
    path: 'protected',
    component: Protected,
    canActivate: [usuarioLogueadoGuard]
  },
  {
    path: 'vuelos',
    component: VuelosComponent,
    children: childrenRoutesVuelos
  },
  {
    path: 'vuelos',
    component: VuelosComponent,
    canActivate: [usuarioLogueadoGuard], 
    children: childrenRoutesVuelos
  }

];
