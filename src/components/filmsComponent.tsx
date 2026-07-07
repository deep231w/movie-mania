import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import MovieCard from "./movieCard";
import useMoviesHook from "../hooks/useMovies";
import { loadNextMovies } from "../services/movie.services";
import { useNetwork } from "../contexts/NetworkContext";

export default function FilmSection() {
  const { shows, setShows } = useMoviesHook(); // expose setShows from hook
const { onlineStatus } = useNetwork();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieRef = (node: HTMLDivElement | null) => {
    if (!onlineStatus) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const movies = await loadNextMovies();

        if (movies.length > 0) {
          setShows(prev => [...prev, ...movies]);
        }
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div className="mt-8 px-2">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Films</h1>
          <p className="mt-2 text-gray-400">
            Browse all available movies
          </p>
        </div>

        {!onlineStatus && (
          <button
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            🔴 You're Offline
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {shows.map((movie, index) => {
          const isLast = index === shows.length - 1;

          return (
            <div
              key={movie.id}
              ref={isLast ? lastMovieRef : null}
            >
              <Link to={`/content/${movie.id}`}>
                <MovieCard image={movie.image} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}