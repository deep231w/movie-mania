import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import MovieCard from "../components/movieCard";
import useMoviesHook from "../hooks/useMovies";
import { Link } from "react-router-dom";

export default function HomePage(){

    const {shows }= useMoviesHook();

    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        if (!shows || shows.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % Math.min(shows.length, 10));
        }, 5000);

        return () => clearInterval(interval);
    }, [shows]);

    const featured = shows?.[currentSlide];

    return (
        <div className="home-page m-5">
            <div>
                <Navbar />
            </div>

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
                            shows.map((s)=>

                                <Link key={s.id} to={`/content/${s.id}`}>
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
                            shows.map((s)=>
                                <Link key={s.id} to={`/content/${s.id}`}>
                                    <MovieCard key={s.id} image={s.image}/>
                                </Link>
                                
                            )}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}