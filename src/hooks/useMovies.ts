import { useEffect, useState } from "react";
import type Movie from "../interfaces/movieInterface";
import {
  loadInitialMovies,
  loadOfflineMovies,
} from "../services/movie.services";
import { useNetwork } from "../contexts/NetworkContext";

export default function useMoviesHook() {
  const [shows, setShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const { onlineStatus } = useNetwork();
console.log("onlineStatus =", onlineStatus);
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      try {
        if (onlineStatus) {
          const movies = await loadInitialMovies();
          setShows(movies);
        } else {
          const movies = await loadOfflineMovies();
          setShows(movies);
        }
      } catch (err) {
        const movies = await loadOfflineMovies();
        setShows(movies);
        setError("Unable to fetch latest data.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [onlineStatus]);

  return {
    shows,
    setShows,
    loading,
    error,
  };
}