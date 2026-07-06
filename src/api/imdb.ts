import axios from "axios"

export default async function FetchImdbApi(){
    try{
        const res=  await axios.get(`https://api.imdbapi.dev/titles?types=TV_SERIES`)
        const parsedContent= res.data.titles.map((title:any)=>({
                    id: title.id,
                    title: title.primaryTitle,
                    image: title.primaryImage?.url,
                    rating: title.rating?.aggregateRating,
                    votes: title.rating?.voteCount,
                    year: title.startYear,
                    genres: title.genres,
                    plot: title.plot,
                    type: title.type,
            }))

            console.log("titles- ", parsedContent)

            return parsedContent;
    }catch(e){
        
        throw e
    }
}