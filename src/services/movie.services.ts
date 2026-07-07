import FetchImdbApi from "../api/imdb";
import {
  getAllRecordsFromDb,
  getNextPageToken,
  insertIntoDB,
  saveNextPageToken,
} from "../db/movie.db";

export async function loadInitialMovies() {
      console.log("API CALLED");

  const response = await FetchImdbApi();

  await insertIntoDB(response.movies);

  if (response.nextPageToken) {
    await saveNextPageToken(response.nextPageToken);
  }

  return response.movies;
}

export async function loadOfflineMovies() {
  return await getAllRecordsFromDb();
}

export async function loadNextMovies() {
  const token = await getNextPageToken();

  if (!token) return [];

  const response = await FetchImdbApi(token);

  await insertIntoDB(response.movies);

  if (response.nextPageToken) {
    await saveNextPageToken(response.nextPageToken);
  }

  return response.movies;
}