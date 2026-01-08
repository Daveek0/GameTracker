/**
 * Hlavní dashboard stránka aplikace.
 * Zobrazuje novinky, platformy, žánry a umožňuje vyhledávání her.
 */
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { Game, GameResponse, Genre, Platform } from '../../models/game.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap, forkJoin } from 'rxjs';
import { addIcons } from 'ionicons';
import { star, gameControllerOutline, home, heart, heartOutline, flame, sparkles, laptop, gameController, trophy, cube, disc } from 'ionicons/icons';

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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar
  ]
})
export class HomePage implements OnInit {
  searchGames: Game[] = [];
  searchTerm: string = '';
  isSearching: boolean = false;
  isLoading: boolean = false;
  favoriteIds: number[] = [];
  
  // Dashboard data
  newReleases: Game[] = [];
  genres: Genre[] = [];
  platforms: Platform[] = [];
  selectedPlatformId: number | null = null;
  platformGames: Game[] = [];
  selectedGenreId: number | null = null;
  genreGames: Game[] = [];
  
  private searchSubject = new Subject<string>();

  // Platform IDs from RAWG API
  private readonly PLATFORM_IDS = {
    PC: 4,
    Xbox: 1,
    PlayStation: 18,
    Switch: 7
  };

  constructor(
    private gameService: GameService,
    private storageService: StorageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ 
      star, gameControllerOutline, home, heart, heartOutline, flame, 
      sparkles, laptop, gameController, trophy, cube, disc
    });
  }

  ngOnInit() {
    this.loadFavorites();
    this.loadDashboardData();

    // Nastavení debounce pro vyhledávání
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.isSearching = true;
        return this.gameService.getGames(searchTerm);
      })
    ).subscribe({
      next: (response: GameResponse) => {
        this.searchGames = response.results;
        this.isSearching = false;
      },
      error: (error) => {
        console.error('Error searching games', error);
        this.isSearching = false;
      }
    });
  }

  loadDashboardData() {
    this.isLoading = true;
    
    forkJoin({
      newReleases: this.gameService.getNewReleases(),
      genres: this.gameService.getGenres(),
      platforms: this.gameService.getPlatforms()
    }).subscribe({
      next: (data) => {
        this.newReleases = data.newReleases.results.slice(0, 6);
        this.genres = data.genres.results.slice(0, 8);
        this.platforms = data.platforms.results.filter(p => 
          Object.values(this.PLATFORM_IDS).includes(p.id)
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data', error);
        this.isLoading = false;
      }
    });
  }

  loadPlatformGames(platformId: number) {
    if (this.selectedPlatformId === platformId) {
      this.selectedPlatformId = null;
      this.platformGames = [];
      return;
    }
    
    this.selectedPlatformId = platformId;
    this.gameService.getGamesByPlatform(platformId).subscribe({
      next: (response: GameResponse) => {
        this.platformGames = response.results.slice(0, 6);
      },
      error: (error) => {
        console.error('Error loading platform games', error);
      }
    });
  }

  onSearchChange(event: any) {
    const value = event.detail.value || '';
    this.searchTerm = value;
    if (value.trim() === '') {
      this.searchGames = [];
    } else {
      this.searchSubject.next(value);
    }
  }

  openGameDetail(game: Game) {
    this.router.navigate(['/detail', game.id]);
  }

  loadGenreGames(genreId: number) {
    if (this.selectedGenreId === genreId) {
      this.selectedGenreId = null;
      this.genreGames = [];
      return;
    }
    
    this.selectedGenreId = genreId;
    this.gameService.getGamesByGenre(genreId).subscribe({
      next: (response: GameResponse) => {
        this.genreGames = response.results.slice(0, 6);
      },
      error: (error) => {
        console.error('Error loading genre games', error);
      }
    });
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
      this.favoriteIds = [...this.favoriteIds.filter(id => id !== game.id)];
    } else {
      this.storageService.addFavorite(game);
      this.favoriteIds = [...this.favoriteIds, game.id];
    }
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

  onLogoError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      console.error('Logo image failed to load');
      // Hide the broken image
      img.style.display = 'none';
    }
  }

  getPlatformIcon(platformName: string): string {
    const name = platformName.toLowerCase();
    if (name.includes('pc') || name.includes('windows')) return 'laptop';
    if (name.includes('xbox')) return 'cube';
    if (name.includes('playstation') || name.includes('ps')) return 'disc';
    if (name.includes('switch') || name.includes('nintendo')) return 'game-controller';
    return 'game-controller-outline';
  }

  getPlatformName(platformId: number): string {
    const entries = Object.entries(this.PLATFORM_IDS);
    const entry = entries.find(([_, id]) => id === platformId);
    return entry ? entry[0] : 'Platform';
  }

  getGenreName(genreId: number): string {
    const genre = this.genres.find(g => g.id === genreId);
    return genre ? genre.name : 'Žánr';
  }
}
