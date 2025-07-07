export interface Movie {
  id: string;
  title: string;
  original_title: string;
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;
  overview: string;
  tagline: string;
  poster_url: string;
  backdrop_url: string;
  trailer_url: string;
  imdb_id: string;
  tmdb_id: number;
  status: 'released' | 'upcoming' | 'in_production';
  adult: boolean;
  popularity_score: number;
  vote_average: number;
  vote_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  cast?: MovieCast[];
  crew?: MovieCrew[];
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  created_at: string;
  movie_count?: number;
  movies?: Movie[];
}

export interface ProductionCompany {
  id: string;
  name: string;
  logo_url: string;
  origin_country: string;
  created_at: string;
  movie_count?: number;
  movies?: Movie[];
}

export interface Person {
  id: string;
  name: string;
  biography: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  profile_image_url: string;
  imdb_id: string;
  tmdb_id: number;
  created_at: string;
  updated_at: string;
  cast_roles?: MovieCast[];
  crew_roles?: MovieCrew[];
}

export interface MovieCast {
  id: string;
  person: Person;
  character_name: string;
  cast_order: number;
  movie?: Movie;
}

export interface MovieCrew {
  id: string;
  person: Person;
  job: string;
  department: string;
  movie?: Movie;
}

// API Request/Response types
export interface MoviesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}

export interface GenresListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Genre[];
}

export interface ProductionCompaniesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductionCompany[];
}

export interface PeopleListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

// Filter and search types
export interface MovieFilters {
  search?: string;
  genre?: string;
  year?: number;
  status?: string;
  featured?: boolean;
  ordering?: string;
  page?: number;
}

export interface MovieSearchParams {
  q: string;
  page?: number;
  include_tmdb?: boolean; // defaults to true in backend
  sync_missing?: boolean; // defaults to true in backend
}

export interface TMDBSearchParams {
  q: string;
}

export interface TMDBSearchResult {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
}

export interface TMDBSearchResponse {
  query: string;
  tmdb_results: {
    page: number;
    results: TMDBSearchResult[];
    total_pages: number;
    total_results: number;
  };
}

export interface SearchStats {
  local_count: number;
  tmdb_count: number;
  synced_count: number;
  total_count: number;
}

export interface EnhancedMovieSearchResponse {
  query: string;
  results: Movie[];
  search_stats: SearchStats;
}

// Admin types
export interface CreateMovieRequest {
  title: string;
  original_title?: string;
  release_date?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  overview?: string;
  tagline?: string;
  poster_url?: string;
  backdrop_url?: string;
  trailer_url?: string;
  imdb_id?: string;
  tmdb_id?: number;
  status?: string;
  adult?: boolean;
  popularity_score?: number;
  vote_average?: number;
  vote_count?: number;
  is_featured?: boolean;
  genres?: string[];
  production_companies?: string[];
}

export interface UpdateMovieRequest extends Partial<CreateMovieRequest> {}

export interface CreateGenreRequest {
  name: string;
  description?: string;
}

export interface CreateProductionCompanyRequest {
  name: string;
  logo_url?: string;
  origin_country?: string;
}

export interface CreatePersonRequest {
  name: string;
  biography?: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
  profile_image_url?: string;
  imdb_id?: string;
  tmdb_id?: number;
}

export type UpdateGenreRequest = Partial<CreateGenreRequest>;
export type UpdateProductionCompanyRequest = Partial<CreateProductionCompanyRequest>;
export type UpdatePersonRequest = Partial<CreatePersonRequest>;

// TMDB Sync types
export interface SyncMovieFromTMDBRequest {
  tmdb_id: number;
}

export interface SyncMovieFromTMDBResponse {
  message: string;
  movie: Movie;
}

export interface SyncGenresFromTMDBResponse {
  message: string;
  genres: Genre[];
}

// API Error type
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
