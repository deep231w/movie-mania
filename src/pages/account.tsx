import { LogOut, User, Heart, History, ArrowLeft } from "lucide-react";
import MovieCard from "../components/movieCard";
import { useNavigate } from "react-router-dom";
import useWatchList from "../hooks/useWatchList";
import { useEffect, useState } from "react";
import useWatchHistoryList from "../hooks/useHistory";

type WatchListMovie = {
  id: string;
  title: string;
  image: string;
};


export default function AccountPage() {
const navigate= useNavigate()
    const [watchList, setWatchList]=useState<WatchListMovie[]>([]);

    const [history , setHistory]=useState<WatchListMovie[]>([]);

  const {getWatchList}=useWatchList()
  const {getListFromWatchHidtory}=useWatchHistoryList()

  async function fetchWatchList() {
    const watchlistdata= await getWatchList();
    setWatchList(watchlistdata);  

    const watchHistoryData= await getListFromWatchHidtory()
    setHistory(watchHistoryData);
  }
  
  useEffect(()=>{
    fetchWatchList();
  },[])

  const handleSignOut= ()=>{
        localStorage.removeItem("user");
        navigate("/signin");
    }
  return (
    <div className="min-h-screen bg-neutral-950 text-white  p-3">
      <div className="flex items-center justify-between rounded-2xl bg-neutral-900 p-6 shadow-lg">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
            <User size={36} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Deep</h1>
            <p className="text-neutral-400">
              deep@gmail.com
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 transition hover:bg-red-700"
          onClick={()=>handleSignOut()}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    <div className="mt-4">
        <button
            onClick={()=>{
                navigate('/home')
            }}
        >
            <ArrowLeft size={40}/>
        </button>
    </div>
      <section className="mt-1">
        <div className="mb-5 flex items-center gap-3">
          <Heart className="text-red-500" />
          <h2 className="text-2xl font-semibold">
            My Watchlist
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
          {watchList.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 transition hover:scale-105"
            >
              <MovieCard image={movie.image} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-center gap-3">
          <History className="text-blue-400" />
          <h2 className="text-2xl font-semibold">
            Watch History
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
          {history.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 transition hover:scale-105"
            >
              <MovieCard image={movie.image} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}