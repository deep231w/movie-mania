import { addTowatchListIndexedb, getAllWatchListFromIndexedb, isAvailableInWatchList } from "../db/movie.db";

export default function useWatchList(){
    async function addToWatchList(content:any){
        try{
            await addTowatchListIndexedb(content);
        }catch(e){
            console.log("error -",e);
            throw e
        }
    }

    async function getWatchList(){
        try{
            const list =await getAllWatchListFromIndexedb()
            return list
        }catch(e){
            throw e
        }
    }

    async function isAvailable(id:string) {
        return await isAvailableInWatchList(id)
    }
    return{
        addToWatchList,
        getWatchList,
        isAvailable
    }
}