/**
 * Stránka s detailními informacemi o vybrané hře.
 * Zobrazuje popis, obrázek, rating a umožňuje přidání do oblíbených.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonButton, 
  IonIcon, 
  IonSpinner 
} from '@ionic/angular/standalone';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { Game } from '../../models/game.model';
import { addIcons } from 'ionicons';
import { star, heart, heartOutline, home } from 'ionicons/icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSpinner
  ]
})
export class DetailPage implements OnInit {
  game: Game | null = null;
  isLoading: boolean = false;
  isFavorite: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private storageService: StorageService
  ) {
    addIcons({ star, heart, heartOutline, home });
  }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.loadGame(parseInt(gameId, 10));
      this.checkFavorite(parseInt(gameId, 10));
    } else {
      this.error = 'ID hry nebylo nalezeno.';
    }
  }

  loadGame(id: number) {
    this.isLoading = true;
    this.error = null;
    this.gameService.getGameById(id).subscribe({
      next: (game: Game) => {
        this.game = game;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading game', error);
        this.error = 'Nepodařilo se načíst detail hry. Zkontrolujte prosím API klíč.';
        this.isLoading = false;
      }
    });
  }

  checkFavorite(gameId: number) {
    this.isFavorite = this.storageService.isFavorite(gameId);
  }

  toggleFavorite() {
    if (!this.game) return;

    if (this.isFavorite) {
      this.storageService.removeFavorite(this.game.id);
      this.isFavorite = false;
    } else {
      this.storageService.addFavorite(this.game);
      this.isFavorite = true;
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  getDescription(): string {
    if (!this.game) return '';
    const description = this.game.description || this.game.description_raw || '';
    // Odstranit španělský text - vše od "Español" nebo "Spanish" dál
    const spanishIndex = description.toLowerCase().indexOf('español');
    const englishIndex = description.toLowerCase().indexOf('spanish');
    const cutIndex = spanishIndex > -1 ? spanishIndex : (englishIndex > -1 ? englishIndex : -1);
    
    if (cutIndex > -1) {
      return description.substring(0, cutIndex).trim();
    }
    return description;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://via.placeholder.com/800x400?text=No+Image';
    }
  }
}

