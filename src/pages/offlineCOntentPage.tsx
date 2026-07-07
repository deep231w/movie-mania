import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Play,
  Heart,
  AlignRightIcon,
  ArrowLeft,
  Star,
  Calendar,
} from "lucide-react";
import { db } from "../db/movie.db";
import type Movie from "../interfaces/movieInterface";
import useWatchList from "../hooks/useWatchList";
import useWatchHistoryList from "../hooks/useHistory";

export default function OfflineContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);

  const { addToWatchList, isAvailable } = useWatchList();
  const { insertIntoWatchHistory, isAvailableInHistory } =
    useWatchHistoryList();

  const [available, setAvailable] = useState(false);
  const [availableInHistory, setAvailableInHistory] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      if (!id) return;

      const data = await db.movies.get(id);

      if (!data) return;

      setMovie(data);

      const watchList = await isAvailable(data.id);
      const history = await isAvailableInHistory(data.id);

      setAvailable(watchList);
      setAvailableInHistory(history);
    }

    loadMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Movie not available offline.
      </div>
    );
  }

const handleInsertToWatchList = async () => {
  if (!movie) return;

  await addToWatchList({
    id: movie.id,
    title: movie.title,
    image: movie.image,
  });

  setAvailable(true);
};

  const handleInsertToHistory = async () => {
  if (!movie) return;

  await insertIntoWatchHistory({
    id: movie.id,
    title: movie.title,
    image: movie.image,
  });

  setAvailableInHistory(true);
};

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="relative h-[650px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 z-20 rounded-full bg-black/50 p-3 hover:bg-black"
        >
          <ArrowLeft />
        </button>

        <div className="relative z-10 flex h-full items-end">
          <div className="max-w-3xl p-10">
            <h1 className="text-5xl font-bold">{movie.title}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-gray-300">
              <span className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={18} />
                {movie.rating}
              </span>

              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {movie.year}
              </span>

              <span>{movie.type}</span>

              <span>{movie.votes.toLocaleString()} Votes</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded bg-red-700 px-3 py-1 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="mt-6 text-lg text-gray-300">{movie.plot}</p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  handleInsertToHistory();
                }}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 font-semibold hover:bg-red-700"
              >
                <Play />
                {availableInHistory ? "Continue Watching" : "Play"}
              </button>

              <button
                onClick={handleInsertToWatchList}
                disabled={available}
                className="flex items-center gap-2 rounded-lg border border-gray-500 px-8 py-4
                  hover:bg-white hover:text-black
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  disabled:hover:bg-transparent
                  disabled:hover:text-white"
              >
                {available ? (
                  <>
                    <AlignRightIcon size={20} />
                    In List
                  </>
                ) : (
                  <>
                    <Heart size={20} />
                    Watchlist
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 rounded-lg border border-yellow-700 bg-yellow-900/20 p-4 text-yellow-300">
              You're viewing cached content in offline mode.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}