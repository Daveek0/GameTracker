/**
 * TypeScript modely pro datové struktury aplikace.
 * Obsahuje rozhraní pro hry, žánry, platformy a jejich API odpovědi.
 */
export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  description?: string;
  description_raw?: string;
}

export interface GameResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background?: string;
}

export interface GenreResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Genre[];
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Platform[];
}

