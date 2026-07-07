import { Link } from "react-router-dom";
import MovieCard from "./movieCard";
import useMoviesHook from "../hooks/useMovies";

export default function FilmSection() {
  const { shows } = useMoviesHook();

  return (
    <div className="mt-8 px-2">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Films</h1>
          <p className="mt-2 text-gray-400">
            Browse all available movies
          </p>
        </div>

        {/* <span className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-gray-300">
          {shows.length} Movies
        </span> */}
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {shows.map((movie) => (
          <Link key={movie.id} to={`/content/${movie.id}`}>
            <MovieCard image={movie.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}