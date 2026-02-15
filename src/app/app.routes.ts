import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MenuList } from './menu-list/menu-list';
import { Admin } from './admin/admin';
import { Login } from './login/login';

export const routes: Routes = [
  { path: 'home', component: Home, title: 'Inicio' },
  { path: 'menu', component: MenuList, title: 'Carta' },
  { path: 'admin', component: Admin, title: 'Gestión' },
  { path: 'login', component: Login, title: 'Iniciar sesión' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
