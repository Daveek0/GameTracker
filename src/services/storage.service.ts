import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly FAVORITES_KEY = 'favorite_games';

  constructor() {}

  getFavorites(): Game[] {
    const favoritesJson = localStorage.getItem(this.FAVORITES_KEY);
    if (favoritesJson) {
      try {
        return JSON.parse(favoritesJson);
      } catch (e) {
        console.error('Error parsing favorites from storage', e);
        return [];
      }
    }
    return [];
  }

  addFavorite(game: Game): void {
    const favorites = this.getFavorites();
    if (!favorites.find(f => f.id === game.id)) {
      favorites.push({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released
      });
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  removeFavorite(gameId: number): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(f => f.id !== gameId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(filtered));
  }

  isFavorite(gameId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(f => f.id === gameId);
  }
}

