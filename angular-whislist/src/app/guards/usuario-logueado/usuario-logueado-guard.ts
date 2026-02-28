import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from '../../services/auth';

export const usuarioLogueadoGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(Auth);
  const isLoggedIn = authService.isLoggedIn();
  console.log('canActivate', isLoggedIn);
  return isLoggedIn;
};
