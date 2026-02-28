import { RouterModule, Routes } from '@angular/router';
import { ListaDestino } from './Components/lista-destino/lista-destino';
import { DestinoDetalle } from './Components/destino-detalle/destino-detalle';
import { Login } from './Components/login/login/login';
import { Protected } from './Components/protected/protected/protected';
import { usuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado-guard';

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
  }
];
