import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'edit-user',
    loadComponent: () => import('./edit-user/edit-user.page').then( m => m.EditUserPage)
  },
  {
    path: 'create-person',
    loadComponent: () => import('./create-person/create-person.page').then( m => m.CreatePersonPage)
  },
  {
    path: 'camera',
    loadComponent: () => import('./camera/camera.page').then( m => m.CameraPage)
  },
  {
    path: 'novelty',
    loadComponent: () => import('./novelty/novelty.page').then( m => m.NoveltyPage)
  },
  {
    path: 'vehicle-exit',
    loadComponent: () => import('./vehicle-exit/vehicle-exit.page').then( m => m.VehicleExitPage)
  },
  {
    path: 'in-out',
    loadComponent: () => import('./in-out/in-out.page').then( m => m.InOutPage),
  },
  {
    path: 'list-person',
    loadComponent: () => import('./list-person/list-person.page').then( m => m.ListPersonPage)
  },
  {  
    path: 'in-out',
    loadComponent: () => import('./in-out/in-out.page').then( m => m.InOutPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'list-register',
    loadComponent: () => import('./list-register/list-register.page').then( m => m.ListRegisterPage)
  },
  {
    path: 'list-novelty',
    loadComponent: () => import('./list-novelty/list-novelty.page').then( m => m.ListNoveltyPage)
  },
  {
    path: 'parking',
    loadComponent: () => import('./parking/parking.page').then( m => m.ParkingPage)
  },

];
