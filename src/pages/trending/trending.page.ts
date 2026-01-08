/**
 * Stránka s trending hrami podle hodnocení a popularity.
 * Umožňuje přepínání mezi filtry Top Rated a Popular.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonAvatar, 
  IonIcon, 
  IonSpinner,
  IonButton,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { Game, GameResponse } from '../../models/game.model';
import { addIcons } from 'ionicons';
import { star, heart, heartOutline, home, flame, trophy, gameControllerOutline } from 'ionicons/icons';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonIcon,
    IonSpinner,
    IonButton,
    IonSegment,
    IonSegmentButton
  ]
})
export class TrendingPage implements OnInit {
  games: Game[] = [];
  isLoading: boolean = false;
  favoriteIds: number[] = [];
  selectedFilter: 'top-rated' | 'popular' = 'top-rated';

  constructor(
    private gameService: GameService,
    private storageService: StorageService,
    private router: Router
  ) {
    addIcons({ star, heart, heartOutline, home, flame, trophy, gameControllerOutline });
  }

  ngOnInit() {
    this.loadFavorites();
    this.loadGames();
  }

  loadGames() {
    this.isLoading = true;
    const request = this.selectedFilter === 'top-rated' 
      ? this.gameService.getTopRatedGames()
      : this.gameService.getPopularGames();

    request.subscribe({
      next: (response: GameResponse) => {
        this.games = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading games', error);
        this.isLoading = false;
      }
    });
  }

  onFilterChangeModel(value: string) {
    this.selectedFilter = value as 'top-rated' | 'popular';
    this.loadGames();
  }

  openGameDetail(game: Game) {
    this.router.navigate(['/detail', game.id]);
  }

  loadFavorites() {
    const favorites = this.storageService.getFavorites();
    this.favoriteIds = favorites.map(f => f.id);
  }

  toggleFavorite(game: Game, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.isFavorite(game.id)) {
      this.storageService.removeFavorite(game.id);
      this.favoriteIds = this.favoriteIds.filter(id => id !== game.id);
    } else {
      this.storageService.addFavorite(game);
      this.favoriteIds = [...this.favoriteIds, game.id];
    }
  }

  isFavorite(gameId: number): boolean {
    return this.favoriteIds.includes(gameId);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://via.placeholder.com/300x400?text=No+Image';
    }
  }
}

