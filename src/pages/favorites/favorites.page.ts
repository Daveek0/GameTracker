import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  IonButton 
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Game } from '../../models/game.model';
import { addIcons } from 'ionicons';
import { heartOutline, star, trashOutline, home, heart, flame } from 'ionicons/icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonButton
  ]
})
export class FavoritesPage implements OnInit {
  favoriteGames: Game[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {
    addIcons({ heartOutline, star, trashOutline, home, heart, flame });
  }

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    // Aktualizace při každém vstupu na stránku
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteGames = this.storageService.getFavorites();
  }

  openGameDetail(game: Game) {
    this.router.navigate(['/detail', game.id]);
  }

  removeFavorite(game: Game, event: Event) {
    event.stopPropagation();
    this.storageService.removeFavorite(game.id);
    this.loadFavorites();
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://via.placeholder.com/300x400?text=No+Image';
    }
  }
}

