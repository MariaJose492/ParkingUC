import { inject, Inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PersonService } from 'Services/PersonService/person.service';
import { AuthService } from 'Services/AuthService/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  
  const personService = inject(PersonService);
  const router = inject(Router);
  const authService = inject(AuthService);

  // Rutas públicas
  const isPublicRoute = route.data['public'] === true;
  if (isPublicRoute) {
    return true;
  }

  // Verificar si requiere login
  const requiresAuth = route.data['requiresAuth'] === true;
  if (requiresAuth && !authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Verificar roles solo para usuarios logueados
  const requiredRoles = route.data['roles'] as Array<string>;
  if (requiredRoles && authService.isLoggedIn()) {
    const userRole = authService.getUserCharge();
    return userRole !== null && requiredRoles.includes(userRole);
  }

  return true;

  
};
