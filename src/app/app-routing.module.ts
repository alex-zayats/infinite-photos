import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/gallery-component/gallery.component')
      .then(module => module.AppGalleryComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./components/favorites-component/favorites.component')
      .then(module => module.AppFavoritesComponent)
  },
  {
    path: 'photos/:id',
    loadComponent: () => import('./components/photo-component/photo.component')
      .then(module => module.AppPhotoComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
