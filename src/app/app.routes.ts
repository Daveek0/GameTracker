import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { DetailPage } from '../pages/detail/detail.page';
import { FavoritesPage } from '../pages/favorites/favorites.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'detail/:id',
    component: DetailPage,
  },
  {
    path: 'favorites',
    component: FavoritesPage,
  },
];

