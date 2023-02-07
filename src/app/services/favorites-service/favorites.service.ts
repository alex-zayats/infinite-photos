import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites$: ReplaySubject<string[]> = new ReplaySubject<string[]>();
  favorites: Set<string>;

  constructor() {
    this.initStorage();
    window.onstorage = () => { this.initStorage(); };
  }

  initStorage() {
    const favoritesStorage = localStorage.getItem('favorites') ?? '';

    try {
      const parsedFavorites = JSON.parse(favoritesStorage);
      this.favorites = new Set(parsedFavorites);
    } catch (error) {
      this.favorites = new Set();
    }

    this.updateStorage();
  }

  updateStorage() {
    this.favorites$.next(Array.from(this.favorites));
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  addFavorite(id: string) {
    this.favorites.add(id);
    this.updateStorage();
  }

  removeFavorite(id: string) {
    this.favorites.delete(id);
    this.updateStorage();
  }

  isFavorite(id: string) {
    return this.favorites.has(id);
  }

  toggleFavorite(id: string) {
    this.isFavorite(id) ? this.removeFavorite(id) : this.addFavorite(id);
  }
}
