import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moviesApi, adminMoviesApi } from '@/lib/api/movies';
import type {
  MovieFilters,
  MovieSearchParams,
  TMDBSearchParams,
  CreateMovieRequest,
  UpdateMovieRequest,
  CreateGenreRequest,
  UpdateGenreRequest,
  CreateProductionCompanyRequest,
  UpdateProductionCompanyRequest,
  CreatePersonRequest,
  UpdatePersonRequest,
  SyncMovieFromTMDBRequest,
} from '@/lib/types/movies';

// Public Movies Hooks

export const useMovies = (filters?: MovieFilters) => {
  return useQuery({
    queryKey: ['movies', filters],
    queryFn: () => moviesApi.getMovies(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => moviesApi.getMovie(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSearchMovies = (params: MovieSearchParams) => {
  return useQuery({
    queryKey: ['movies', 'search', params],
    queryFn: () => moviesApi.searchMovies(params),
    enabled: !!params.q && params.q.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useSearchTMDB = (params: TMDBSearchParams) => {
  return useQuery({
    queryKey: ['tmdb', 'search', params],
    queryFn: () => moviesApi.searchTMDB(params),
    enabled: !!params.q && params.q.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedMovies = (page?: number) => {
  return useQuery({
    queryKey: ['movies', 'featured', page],
    queryFn: () => moviesApi.getFeaturedMovies(page),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const usePopularMovies = (page?: number) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => moviesApi.getPopularMovies(page),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTopRatedMovies = (page?: number) => {
  return useQuery({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => moviesApi.getTopRatedMovies(page),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Genres Hooks

export const useGenres = (page?: number) => {
  return useQuery({
    queryKey: ['genres', page],
    queryFn: () => moviesApi.getGenres(page),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useGenre = (id: string) => {
  return useQuery({
    queryKey: ['genre', id],
    queryFn: () => moviesApi.getGenre(id),
    enabled: !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Production Companies Hooks

export const useProductionCompanies = (page?: number) => {
  return useQuery({
    queryKey: ['production-companies', page],
    queryFn: () => moviesApi.getProductionCompanies(page),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useProductionCompany = (id: string) => {
  return useQuery({
    queryKey: ['production-company', id],
    queryFn: () => moviesApi.getProductionCompany(id),
    enabled: !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// People Hooks

export const usePeople = (search?: string, page?: number) => {
  return useQuery({
    queryKey: ['people', search, page],
    queryFn: () => moviesApi.getPeople(search, page),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePerson = (id: string) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => moviesApi.getPerson(id),
    enabled: !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Admin Mutation Hooks

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateMovieRequest) => adminMoviesApi.createMovie(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMovieRequest }) =>
      adminMoviesApi.updateMovie(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['movie', id] });
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useUpdateMoviePartial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMovieRequest }) =>
      adminMoviesApi.updateMoviePartial(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['movie', id] });
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => adminMoviesApi.deleteMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useCreateGenre = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateGenreRequest) => adminMoviesApi.createGenre(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
};

export const useUpdateGenre = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGenreRequest }) =>
      adminMoviesApi.updateGenre(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['genre', id] });
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
};

export const useDeleteGenre = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => adminMoviesApi.deleteGenre(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
};

export const useCreateProductionCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProductionCompanyRequest) => adminMoviesApi.createProductionCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['production-companies'] });
    },
  });
};

export const useUpdateProductionCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductionCompanyRequest }) =>
      adminMoviesApi.updateProductionCompany(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['production-company', id] });
      queryClient.invalidateQueries({ queryKey: ['production-companies'] });
    },
  });
};

export const useDeleteProductionCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => adminMoviesApi.deleteProductionCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['production-companies'] });
    },
  });
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePersonRequest) => adminMoviesApi.createPerson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
    },
  });
};

export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePersonRequest }) =>
      adminMoviesApi.updatePerson(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['person', id] });
      queryClient.invalidateQueries({ queryKey: ['people'] });
    },
  });
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => adminMoviesApi.deletePerson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
    },
  });
};

// TMDB Sync Hooks

export const useSyncMovieFromTMDB = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SyncMovieFromTMDBRequest) => adminMoviesApi.syncMovieFromTMDB(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useSyncGenresFromTMDB = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => adminMoviesApi.syncGenresFromTMDB(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
};
