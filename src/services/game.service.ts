import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, GameResponse } from '../models/game.model';
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
}

