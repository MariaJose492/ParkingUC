import { inject, Inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from 'Services/LoginService/login.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  // Rutas públicas
  const isPublicRoute = route.data['public'] === true;
  if (isPublicRoute) {
    return true;
  }

  // Verificar si requiere login
  const requiresAuth = route.data['requiresAuth'] === true;
  if (requiresAuth && !loginService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Verificar roles solo para usuarios logueados
  const requiredRoles = route.data['roles'] as Array<string>;
  if (requiredRoles && loginService.isLoggedIn()) {
    const userRole = loginService.getUserCharge();
    if (userRole && requiredRoles.includes(userRole)) {
      return true;
    } else {
      router.navigate(['/parking']);
      return false;
    }
  }

  return true;
  
};
