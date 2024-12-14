import { Routes } from '@angular/router';
import { PersonajesPage } from './personajes/personajes.page';

export const routes: Routes = [
  {
//    path: 'home',
//    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      path: 'login',
      loadComponent: () => import('./login/login.page').then( m => m.LoginPage),

},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {

    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  
//    path: 'login',
//    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'localizacion',
    loadComponent: () => import('./localizacion/localizacion.page').then( m => m.LocalizacionPage)
  },
  
  
  {
    path: 'pasajero',
    loadComponent: () => import('./pasajero/pasajero.page').then( m => m.PasajeroPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  { 
    path: 'personajes',
    loadComponent: () => import('./personajes/personajes.page').then( m => m.PersonajesPage)
  },
  
];
