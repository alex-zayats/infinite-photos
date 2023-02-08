import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: Map<number, string>;
  favorites$: ReplaySubject<Map<number, string>> = new ReplaySubject();

  constructor() {
    this.initStorage();
    window.onstorage = () => { this.initStorage(); };
  }

  private getId(url: string): number {
    const photoMatch = url.match(/id\/(\d*)/);
    return (photoMatch && photoMatch[1]) ? +photoMatch[1] : -1;
  }

  initStorage(): void {
    const favoritesStorage = localStorage.getItem('favorites') ?? '';

    try {
      const parsedFavorites = JSON.parse(favoritesStorage);
      this.favorites = new Map(parsedFavorites);
    } catch (error) {
      this.favorites = new Map();
    }

    this.updateStorage();
  }

  updateStorage(): void {
    this.favorites$.next(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  getUrl(id: number): string {
    return this.favorites.get(id) ?? '';
  }

  addFavorite(url: string): void {
    this.favorites.set(this.getId(url), url);
    this.updateStorage();
  }

  removeFavorite(url: string): void {
    this.favorites.delete(this.getId(url));
    this.updateStorage();
  }

  isFavorite(url: string): boolean {
    return this.favorites.has(this.getId(url));
  }

  toggleFavorite(url: string): void {
    this.isFavorite(url) ? this.removeFavorite(url) : this.addFavorite(url);
  }
}
