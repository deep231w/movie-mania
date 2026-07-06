import { useEffect, useState } from "react";
import type Movie from "../interfaces/movieInterface";
import MovieService from "../services/movie.services";

export default function useMoviesHook(){

    const [shows, setShows] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        async function fetchData() {
            try{
                setLoading(true)
                const moviesForRener=await MovieService();
                setShows(moviesForRener);
            }catch(e){
                console.log("error in movie hook-",e);
                setError("server error!!");
                throw e;
            }finally{
                setLoading(false)
            }
        }

        fetchData();

    },[])

    return {shows ,error , loading}   
}