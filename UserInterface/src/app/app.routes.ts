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
    path: 'home-page',
    loadComponent: () => import('./home-page/home-page.page').then( m => m.HomePagePage)
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
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },



];
