import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonSearchbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonAvatar, 
  IonIcon, 
  IonSpinner,
  IonButton,
  IonButtons
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { Game, GameResponse } from '../../models/game.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { addIcons } from 'ionicons';
import { star, gameControllerOutline, home, heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonIcon,
    IonSpinner,
    IonButton,
    IonButtons
  ]
})
export class HomePage implements OnInit {
  games: Game[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  favoriteIds: number[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private gameService: GameService,
    private storageService: StorageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ star, gameControllerOutline, home, heart, heartOutline });
  }

  ngOnInit() {
    this.loadFavorites();
    this.loadGames();

    // Nastavení debounce pro vyhledávání
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.isLoading = true;
        return this.gameService.getGames(searchTerm);
      })
    ).subscribe({
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

  loadGames() {
    this.isLoading = true;
    this.gameService.getGames().subscribe({
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

  onSearchChange(event: any) {
    const value = event.detail.value || '';
    this.searchTerm = value;
    if (value.trim() === '') {
      this.loadGames();
    } else {
      this.searchSubject.next(value);
    }
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
    const index = this.favoriteIds.indexOf(game.id);
    if (index > -1) {
      this.storageService.removeFavorite(game.id);
      // Vytvořit nové pole pro Angular change detection
      this.favoriteIds = [...this.favoriteIds.filter(id => id !== game.id)];
    } else {
      this.storageService.addFavorite(game);
      // Vytvořit nové pole pro Angular change detection
      this.favoriteIds = [...this.favoriteIds, game.id];
    }
    // Vynutit aktualizaci UI
    this.cdr.detectChanges();
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

