import axios from "axios";
import { API_KEY } from "../constants";

export const apiBaseUrl = "https://api.themoviedb.org/3";
export const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day`;
export const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming`;
export const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated`;

export const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}`;
export const movieCreditsEndpoint = (id) => `${apiBaseUrl}/movie/${id}/credits`;
export const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar`;
export const searchMoviesEndpoint = () => `${apiBaseUrl}/search/movie`;

export const personDetailsEndpoint = (id) => `${apiBaseUrl}/person/${id}`;
export const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const fallbackMoviePoster =
  "https://m.media-amazon.com/images/M/MV5BZWRkMTc4NzUtZmJkOS00Yjc4LTk0ODQtNTBhYWQwZWM1YWZjXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_FMjpg_UX1000_.jpg";
export const fallbackPersonImage =
  "https://i.insider.com/5dae19a2045a3147ab4011b5?width=800&format=jpeg&auto=webp";

export const apiCall = async (endpoint, params) => {
  try {
    const response = await axios.get(endpoint, {
      params: {
        api_key: "552c2b8ec47797d6414f804845bdd32d",
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

export const fetchTrendingMovies = async () => {
  return apiCall(trendingMoviesEndpoint, { language: "en-US" });
};

export const fetchUpcomingMovies = async () => {
  return apiCall(upcomingMoviesEndpoint, { language: "en-US" });
};

export const fetchTopRatedMovies = async () => {
  return apiCall(topRatedMoviesEndpoint, { language: "en-US" });
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};
