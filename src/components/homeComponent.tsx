import { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/movieCard";
import useMoviesHook from "../hooks/useMovies";
import { Link, useNavigate } from "react-router-dom";
import { AlignRightIcon, Heart, Play } from "lucide-react";
import useWatchHistoryList from "../hooks/useHistory";
import { useNetwork } from "../contexts/NetworkContext";

interface WatchListMovie {
  id: string;
  title: string;
  image: string;
}

export default function HomeComponent (){
    const {shows }= useMoviesHook();
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate= useNavigate();
    const { getListFromWatchHidtory }=useWatchHistoryList()
    const [listHistories ,setListHistories]=useState<WatchListMovie[]>([]);
    const { onlineStatus } = useNetwork();
    
    
    useEffect(() => {
        async function loadHistory() {
            const list = await getListFromWatchHidtory();
            setListHistories(list);
        }

        loadHistory();
    }, []);

    const historyIds = useMemo(
        () => new Set(listHistories.map((m) => m.id)),
        [listHistories]
    );


    useEffect(() => {
        if (!shows || shows.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.min(shows.length, 10));
        }, 5000);

        return () => clearInterval(interval);
    }, [shows]);

    const featured = shows?.[currentSlide];
    const isInHistory = featured ? historyIds.has(featured.id) : false;

    const topShows = shows.slice(0, 10);
    const recommendedShows = shows.slice(10, 20);

    const handleNavigate= ()=>{
        if(!onlineStatus){
            navigate(`/offline-content/${featured.id}`)
            return
        }

        navigate(`/content/${featured.id}`)

    }
    return(
        <>
            <div className="slide-containts rounded-lg border h-215 mt-4">
                <div
                    className="relative h-full rounded-xl overflow-hidden bg-cover bg-center transition-all duration-700"
                    style={{
                        backgroundImage: `url(${featured?.image})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                    <div className="relative z-10 flex h-full items-end">
                        <div className="max-w-xl p-12 text-white">
                            <h1 className="text-5xl font-bold">{featured?.title}</h1>

                            <p className="mt-4">
                                ⭐ {featured?.rating} • {featured?.year}
                            </p>

                            <p className="mt-4 line-clamp-3">
                                {featured?.plot}
                            </p>
                            <div className="flex gap-2 pt-2">
                                <button
                                    className="flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 font-semibold hover:bg-red-700"
                                    onClick={()=>handleNavigate()}
                                >
                                    <Play/>
                                    Play
                                </button>
                                <button
                                    className="flex items-center gap-2 rounded-lg border border-gray-500 px-8 py-4
                                        hover:bg-white hover:text-black
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                        disabled:hover:bg-transparent
                                        disabled:hover:text-white
                                    "
                                >
                                    {isInHistory ? 
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
            </div>

            {/* top shows*/}
            <div className="top-content mt-10 scrollbar-hide">
                <h1>Top Shows</h1>
                <div className="rounded-lg h-80 mt-2 flex gap-4 overflow-x-scroll no-scrollbar whitespace-nowrap items-center">
                    {shows.length >0 && 
                        <>{
                            topShows.map((s)=>

                                <Link key={s.id} to={
                                    onlineStatus
                                    ? `/content/${s.id}`
                                    : `/offline-content/${s.id}`
                                }>
                                    <MovieCard key={s.id} image={s.image}/>
                                </Link>
                            )}
                        </>
                    }
                </div>
            </div>
            {/* recommended shows */}
            <div className="recommended mt-10">
                <h1>Recommended Shows</h1>
                <div className="rounded-lg h-80 mt-2 flex gap-4 overflow-x-scroll no-scrollbar whitespace-nowrap items-center">
                    {shows.length >0 && 
                        <>{
                            recommendedShows.map((s)=>
                                <Link key={s.id} to={
                                    onlineStatus
                                    ? `/content/${s.id}`
                                    : `/offline-content/${s.id}`
                                }>
                                    <MovieCard key={s.id} image={s.image}/>
                                </Link>
                                
                            )}
                        </>
                    }
                </div>
            </div>
        </>
    )
}