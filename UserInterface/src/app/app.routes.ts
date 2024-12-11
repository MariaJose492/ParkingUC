// import { Routes } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from './Auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    data: { public: true } 
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: { public: true } 
  },
  {
    path: 'home-page',
    loadComponent: () => import('./home-page/home-page.page').then(m => m.HomePagePage),
    data: { public: true } 
    path: 'edit-user',
    loadComponent: () => import('./edit-user/edit-user.page').then( m => m.EditUserPage)
  },
  {
    path: 'create-person',
    loadComponent: () => import('./create-person/create-person.page').then(m => m.CreatePersonPage),
    data: { public: true } 
  },
  {
    path: 'camera',
    loadComponent: () => import('./camera/camera.page').then(m => m.CameraPage),
    canActivate: [authGuard],
    data: { 
      requiresAuth: true,
      roles: ['Vigilante', 'Administrador'] 
    }
  },
  {
    path: 'novelty',
    loadComponent: () => import('./novelty/novelty.page').then(m => m.NoveltyPage),
    canActivate: [authGuard],
    data: { 
      requiresAuth: true,
      roles: ['Vigilante', 'Administrador'] 
    }
  },
  {
    path: 'vehicle-exit',
    loadComponent: () => import('./vehicle-exit/vehicle-exit.page').then(m => m.VehicleExitPage),
    canActivate: [authGuard],
    data: { 
      requiresAuth: true,
      roles: ['Vigilante', 'Administrador'] 
    },
  },
  {
    path: 'in-out',
    loadComponent: () => import('./in-out/in-out.page').then(m => m.InOutPage),
    canActivate: [authGuard],
    data: { 
      requiresAuth: true,
      roles: ['Vigilante', 'Administrador'] 
    },
  },
  {
    path: 'list-person',
    loadComponent: () => import('./list-person/list-person.page').then(m => m.ListPersonPage),
    canActivate: [authGuard],
    data: { 
      requiresAuth: true,
      roles: ['Vigilante', 'Administrador'] 
    },
    loadComponent: () => import('./list-person/list-person.page').then( m => m.ListPersonPage)
  },
  {  
    path: 'in-out',
    loadComponent: () => import('./in-out/in-out.page').then( m => m.InOutPage)
  },
  // {
  //   path: 'in-out',
  //   loadComponent: () => import('./in-out/in-out.page').then(m => m.InOutPage),
  //   canActivate: [authGuard],
  //   data: { roles: ['Vigilante', 'Administrador'] },
  // },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
    canActivate: [authGuard],
    data: { 
      requiresAuth: true,
      roles: ['Vigilante', 'Administrador'] 
    }
  },
  {
    path: 'list-register',
    loadComponent: () => import('./list-register/list-register.page').then(m => m.ListRegisterPage),
    canActivate: [authGuard],
    data: { 
      requiresAuth: true,
      roles: ['Vigilante', 'Administrador'] 
    },
  },
  {
    path: 'list-novelty',
    loadComponent: () => import('./list-novelty/list-novelty.page').then(m => m.ListNoveltyPage),
    canActivate: [authGuard],
    data: { 
      requiresAuth: true,
      roles: ['Vigilante', 'Administrador'] 
    },
  },
  {
    path: 'parking',
    loadComponent: () => import('./parking/parking.page').then( m => m.ParkingPage)
  },

];
