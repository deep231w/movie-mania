import FetchImdbApi from "../api/imdb";
import { getAllRecordsFromDb, insertIntoDB } from "../db/movie.db";

export default async function MovieService(){

    const dbMovies= await getAllRecordsFromDb()

    if(dbMovies.length>0){
        return dbMovies
    }

    const fetchdMoviesRecordFromAPi= await FetchImdbApi();

    await insertIntoDB(fetchdMoviesRecordFromAPi);

    return fetchdMoviesRecordFromAPi;
}
