import api from './auth';
import { AxiosError } from 'axios';
import type {
  Movie,
  Genre,
  ProductionCompany,
  Person,
  MoviesListResponse,
  GenresListResponse,
  ProductionCompaniesListResponse,
  PeopleListResponse,
  MovieFilters,
  MovieSearchParams,
  TMDBSearchParams,
  TMDBSearchResponse,
  EnhancedMovieSearchResponse,
  SyncMovieFromTMDBRequest,
  SyncMovieFromTMDBResponse,
  SyncGenresFromTMDBResponse,
  CreateMovieRequest,
  UpdateMovieRequest,
  CreateGenreRequest,
  UpdateGenreRequest,
  CreateProductionCompanyRequest,
  UpdateProductionCompanyRequest,
  CreatePersonRequest,
  UpdatePersonRequest,
  ApiError,
} from '@/lib/types/movies';

// Error handler
const handleApiError = (error: AxiosError): ApiError => {
  if (error.response?.data) {
    const data = error.response.data as Record<string, unknown>;
    return {
      message: (data.message as string) || (data.detail as string) || 'An error occurred',
      errors: (data.errors as Record<string, string[]>) || data,
    };
  }
  return {
    message: error.message || 'Network error',
  };
};

// Public Movie APIs
export const moviesApi = {
  // Movies
  getMovies: async (filters?: MovieFilters): Promise<MoviesListResponse> => {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }
      const response = await api.get(`/movies/?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  getMovie: async (id: string): Promise<Movie> => {
    try {
      const response = await api.get(`/movies/${id}/`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  searchMovies: async (params: MovieSearchParams): Promise<EnhancedMovieSearchResponse> => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('q', params.q);
      if (params.page) {
        searchParams.append('page', params.page.toString());
      }
      // include_tmdb and sync_missing default to true in backend, only send if explicitly false
      if (params.include_tmdb === false) {
        searchParams.append('include_tmdb', 'false');
      }
      if (params.sync_missing === false) {
        searchParams.append('sync_missing', 'false');
      }
      const response = await api.get(`/movies/search/?${searchParams.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  getFeaturedMovies: async (page?: number): Promise<MoviesListResponse> => {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      const response = await api.get(`/movies/featured/?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  getPopularMovies: async (page?: number): Promise<MoviesListResponse> => {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      const response = await api.get(`/movies/popular/?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  getTopRatedMovies: async (page?: number): Promise<MoviesListResponse> => {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      const response = await api.get(`/movies/top-rated/?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Genres
  getGenres: async (page?: number): Promise<GenresListResponse> => {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      const response = await api.get(`/movies/genres/?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  getGenre: async (id: string): Promise<Genre> => {
    try {
      const response = await api.get(`/movies/genres/${id}/`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Production Companies
  getProductionCompanies: async (page?: number): Promise<ProductionCompaniesListResponse> => {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      const response = await api.get(`/movies/production-companies/?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  getProductionCompany: async (id: string): Promise<ProductionCompany> => {
    try {
      const response = await api.get(`/movies/production-companies/${id}/`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // People
  getPeople: async (search?: string, page?: number): Promise<PeopleListResponse> => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (page) params.append('page', page.toString());
      const response = await api.get(`/movies/people/?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  getPerson: async (id: string): Promise<Person> => {
    try {
      const response = await api.get(`/movies/people/${id}/`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // TMDB Search
  searchTMDB: async (params: TMDBSearchParams): Promise<TMDBSearchResponse> => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('q', params.q);
      const response = await api.get(`/movies/tmdb-search/?${searchParams.toString()}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },
};

// Admin Movie APIs (require admin authentication)
export const adminMoviesApi = {
  // Movies
  createMovie: async (data: CreateMovieRequest): Promise<Movie> => {
    try {
      const response = await api.post('/movies/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  updateMovie: async (id: string, data: UpdateMovieRequest): Promise<Movie> => {
    try {
      const response = await api.put(`/movies/${id}/`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  updateMoviePartial: async (id: string, data: UpdateMovieRequest): Promise<Movie> => {
    try {
      const response = await api.patch(`/movies/${id}/`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  deleteMovie: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/movies/${id}/`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Genres
  createGenre: async (data: CreateGenreRequest): Promise<Genre> => {
    try {
      const response = await api.post('/movies/genres/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  updateGenre: async (id: string, data: UpdateGenreRequest): Promise<Genre> => {
    try {
      const response = await api.put(`/movies/genres/${id}/`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  deleteGenre: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/movies/genres/${id}/`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Production Companies
  createProductionCompany: async (data: CreateProductionCompanyRequest): Promise<ProductionCompany> => {
    try {
      const response = await api.post('/movies/production-companies/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  updateProductionCompany: async (id: string, data: UpdateProductionCompanyRequest): Promise<ProductionCompany> => {
    try {
      const response = await api.put(`/movies/production-companies/${id}/`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  deleteProductionCompany: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/movies/production-companies/${id}/`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // People
  createPerson: async (data: CreatePersonRequest): Promise<Person> => {
    try {
      const response = await api.post('/movies/people/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  updatePerson: async (id: string, data: UpdatePersonRequest): Promise<Person> => {
    try {
      const response = await api.put(`/movies/people/${id}/`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  deletePerson: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/movies/people/${id}/`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // TMDB Sync functions
  syncMovieFromTMDB: async (data: SyncMovieFromTMDBRequest): Promise<SyncMovieFromTMDBResponse> => {
    try {
      const response = await api.post('/movies/sync-from-tmdb/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  syncGenresFromTMDB: async (): Promise<SyncGenresFromTMDBResponse> => {
    try {
      const response = await api.post('/movies/sync-genres-from-tmdb/');
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },
};
