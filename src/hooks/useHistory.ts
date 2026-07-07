import { getAllWatchHistoryListDb, insertToWatchHistoryDB, isAvailableInWatchHistoryDb } from "../db/movie.db";

export default function useWatchHistoryList(){

    async function insertIntoWatchHistory(content:any) {
        await insertToWatchHistoryDB(content);
    }

    async function getListFromWatchHidtory() {
        const res = await getAllWatchHistoryListDb()

        return res;
    }

      async function isAvailableInHistory(id: string) {
            return await isAvailableInWatchHistoryDb(id);
        }

    return {
        insertIntoWatchHistory,
        getListFromWatchHidtory,
        isAvailableInHistory
    }
}