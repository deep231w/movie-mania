import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Calendar,
  Globe,
  Heart,
  Play,
  ArrowLeft,
  Loader2,
  AlignRightIcon,
} from "lucide-react";
import useWatchList from "../hooks/useWatchList";

export default function ContentPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  const {addToWatchList ,isAvailable}=useWatchList()

  const [available, setAvailable] = useState(false);

  async function isAvailableList() {
    if(!id) return
     const exists = await isAvailable(id);

  setAvailable(exists);

  }

  useEffect(()=>{
    isAvailableList()
  },[])
  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await axios.get(
          `https://api.imdbapi.dev/titles/${id}`
        );

        setMovie(res.data);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id , available]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
            <Loader2 size={60} color="red"/>
      </div>
    );

  if (!movie)
    return (
      <div className="p-10 text-white">
        Movie not found
      </div>
    );


    const handleInsetToWatchList = async ()=>{
        try{
            const content= {
                id:movie.id,
                title:movie.primaryTitle,
                image:movie.primaryImage.url
            }

            const addingwatchlistres=await addToWatchList(content)
            console.log("during adding watchlist -", addingwatchlistres);
            
            setAvailable(true)
        }catch(e){
            console.log("error during add to watchlist ", e);
            throw e;
            
        }
    }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div
        className="relative h-[650px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.primaryImage.url})`,
        }}
      >
        <button
            className="absolute left-6 top-6 z-20 rounded-full bg-black/50 p-3 backdrop-blur hover:bg-black/70"
            onClick={()=>navigate('/home')}
        >
            <ArrowLeft size={34} color="red" />
        </button>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

        <div className="relative flex h-full items-end px-20 pb-16">
          <img
            src={movie.primaryImage.url}
            className="h-[420px] rounded-xl shadow-2xl"
          />

          <div className="ml-10 max-w-3xl">
            <h1 className="text-6xl font-bold">
              {movie.primaryTitle}
            </h1>

            <div className="mt-5 flex gap-6 text-lg text-gray-300">
              <span className="flex items-center gap-2">
                <Star size={18} />
                {movie.rating.aggregateRating}
              </span>

              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {movie.startYear}
              </span>

              <span>{movie.type}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre: string) => (
                <span
                  key={genre}
                  className="rounded-full bg-red-600/30 px-4 py-2"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              {movie.plot}
            </p>

            <div className="mt-8 flex gap-5">
              <button className="flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 font-semibold hover:bg-red-700">
                <Play size={20} />
                Play
              </button>

              <button 
                className="flex items-center gap-2 rounded-lg border border-gray-500 px-8 py-4 hover:bg-white hover:text-black"
                onClick={()=>handleInsetToWatchList()}
                disabled={available}
              >
                {available ? 
                <>
                    <AlignRightIcon size={20}/>
                    In List
                </>:
                <>
                    <Heart size={20} />
                    Watchlist
                </>
                }
                
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-10 py-12">
        <section>
          <h2 className="mb-4 text-3xl font-bold">
            Cast
          </h2>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {movie.stars.map((star: any) => (
              <div
                key={star.id}
                className="rounded-xl bg-neutral-900 p-4"
              >
                {star.primaryImage && (
                  <img
                    src={star.primaryImage.url}
                    className="h-52 w-full rounded-lg object-cover"
                  />
                )}

                <h3 className="mt-3 font-semibold">
                  {star.displayName}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 text-3xl font-bold">
            Directors
          </h2>

          <div className="flex flex-wrap gap-3">
            {movie.directors.map((director: any) => (
              <span
                key={director.id}
                className="rounded-full bg-neutral-800 px-5 py-2"
              >
                {director.displayName}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 text-3xl font-bold">
            Writers
          </h2>

          <div className="flex flex-wrap gap-3">
            {movie.writers.map((writer: any) => (
              <span
                key={writer.id}
                className="rounded-full bg-neutral-800 px-5 py-2"
              >
                {writer.displayName}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 text-3xl font-bold">
            Languages & Country
          </h2>

          <p className="text-gray-300">
            <Globe className="mr-2 inline" size={18} />

            {movie.spokenLanguages
              .map((l: any) => l.name)
              .join(", ")}

            {" • "}

            {movie.originCountries
              .map((c: any) => c.name)
              .join(", ")}
          </p>
        </section>
      </div>
    </div>
  );
}