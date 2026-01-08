import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, GameResponse, Genre, GenreResponse, Platform, PlatformResponse } from '../models/game.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = environment.rawgApiKey;

  constructor(private http: HttpClient) {}

  getGames(search?: string, page: number = 1): Observable<GameResponse> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('page', page.toString())
      .set('page_size', '20');

    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<GameResponse>(this.apiUrl, { params });
  }

  getGameById(id: number): Observable<Game> {
    const params = new HttpParams().set('key', this.apiKey);
    return this.http.get<Game>(`${this.apiUrl}/${id}`, { params });
  }

  getTopRatedGames(page: number = 1): Observable<GameResponse> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page', page.toString())
      .set('page_size', '20')
      .set('ordering', '-rating');
    
    return this.http.get<GameResponse>(this.apiUrl, { params });
  }

  getPopularGames(page: number = 1): Observable<GameResponse> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page', page.toString())
      .set('page_size', '20')
      .set('ordering', '-added');
    
    return this.http.get<GameResponse>(this.apiUrl, { params });
  }

  getNewReleases(page: number = 1): Observable<GameResponse> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page', page.toString())
      .set('page_size', '10')
      .set('ordering', '-released')
      .set('dates', `${new Date().getFullYear()}-01-01,${new Date().toISOString().split('T')[0]}`);
    
    return this.http.get<GameResponse>(this.apiUrl, { params });
  }

  getGamesByGenre(genreId: number, page: number = 1): Observable<GameResponse> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page', page.toString())
      .set('page_size', '10')
      .set('genres', genreId.toString());
    
    return this.http.get<GameResponse>(this.apiUrl, { params });
  }

  getGamesByPlatform(platformId: number, page: number = 1): Observable<GameResponse> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page', page.toString())
      .set('page_size', '10')
      .set('platforms', platformId.toString());
    
    return this.http.get<GameResponse>(this.apiUrl, { params });
  }

  getGenres(): Observable<GenreResponse> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page_size', '20');
    
    return this.http.get<GenreResponse>('https://api.rawg.io/api/genres', { params });
  }

  getPlatforms(): Observable<PlatformResponse> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('page_size', '20');
    
    return this.http.get<PlatformResponse>('https://api.rawg.io/api/platforms', { params });
  }
}

