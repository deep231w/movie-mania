import Dexie, { type EntityTable } from "dexie";
import type Movie from "../interfaces/movieInterface";

interface WatchListMovie {
  id: string;
  title: string;
  image: string;
}
interface CacheEntry {
  key: string;
  value: string;
}

export const db= new Dexie('Movies-db') as Dexie & {
    movies:EntityTable<Movie ,'id'>,
    cache: EntityTable<CacheEntry, "key">;

}

db.version(1).stores({
    movies: "id,title,image,rating,votes,year,genres,plot,type",
    cache:'key'
})

export async function insertIntoDB(movies:any){

    await db.movies.bulkPut(movies)

}

export async function getAllRecordsFromDb() {
    const movies = await db.movies.toArray()
    return movies
}

export async function saveNextPageToken(token: string) {
  await db.cache.put({
    key: "nextPageToken",
    value: token,
  });
}

export async function getNextPageToken() {
  const token = await db.cache.get("nextPageToken");

  return token?.value;
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
