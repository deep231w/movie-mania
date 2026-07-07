import Dexie, { type EntityTable } from "dexie";
import type Movie from "../interfaces/movieInterface";

// interface Movie{
//     id:     string
//     title:  string
//     image:  string
//     rating: string
//     votes:  string
//     year:   string
//     genres: string[]
//     plot:   string
//     type:   string
// }

interface WatchListMovie {
  id: string;
  title: string;
  image: string;
}
export const db= new Dexie('Movies-db') as Dexie & {
    movies:EntityTable<Movie ,'id'>
}

db.version(1).stores({
    movies: "id,title,image,rating,votes,year,genres,plot,type",
})

export async function insertIntoDB(movies:any){

    await db.movies.bulkPut(movies)

}

export async function getAllRecordsFromDb() {
    const movies = await db.movies.toArray()
    return movies
}


export const watchListdb= new Dexie('watchlist-db') as Dexie &{
    movies:EntityTable<WatchListMovie ,'id'>
}

watchListdb.version(1).stores({
    movies:"id,title,image"
})

export async function addTowatchListIndexedb(content:any){
    await watchListdb.movies.add(content)
}

export async function getAllWatchListFromIndexedb(){
    const data= await watchListdb.movies.toArray();
    return data;
}

export async function isAvailableInWatchList(id:string) {
    const movie = await watchListdb.movies.get(id);

    return movie !== undefined;
}

//history db

export const watchHistoryListDb= new Dexie('watchHistory-list-db') as Dexie &{
    movies:EntityTable<WatchListMovie ,'id'>
} 

watchHistoryListDb.version(1).stores({
    movies:"id,title,image"
})
export async function insertToWatchHistoryDB(content:WatchListMovie) {
    
    await watchHistoryListDb.movies.add(content);
}

export async function getAllWatchHistoryListDb() {
    const data= await watchHistoryListDb.movies.toArray()
    return data
}

export async function isAvailableInWatchHistoryDb (id:string){
    const content = await watchHistoryListDb.movies.get(id);

    return content !== undefined;
}
